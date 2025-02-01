locals {
  default_services = {
    orion = {
      name = "orion"
      url  = "http://orion:1026"
      routes = [
        {
          name          = "orion-route"
          paths         = ["/orion"]
          strip_path    = true
          preserve_host = false
        }
      ]
    }
  }

  # Merge default services with user-defined services
  all_services = merge(local.default_services, var.services)
}

# Create Kong services
resource "kong_service" "services" {
  for_each = local.all_services

  name = each.value.name
  url  = each.value.url
}

# Create routes for each service
resource "kong_route" "routes" {
  for_each = {
    for route in flatten([
      for svc_key, svc in local.all_services : [
        for route in svc.routes : {
          key          = "${svc_key}-${route.name}"
          service_name = svc.name
          route        = route
        }
      ]
    ]) : route.key => route
  }

  name          = each.value.route.name
  service_name  = each.value.service_name
  paths         = each.value.route.paths
  strip_path    = each.value.route.strip_path
  preserve_host = each.value.route.preserve_host
}

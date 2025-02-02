# Create Kong services
resource "kong-gateway_upstream" "orion_upstream" {
  name = "orion"
}

resource "kong-gateway_service" "orion_service" {
  name            = "orion"
  host            = "orion"
  port            = 1026
  protocol        = "http"
  retries         = 5
  connect_timeout = 60000
  write_timeout   = 60000
  read_timeout    = 60000
}

resource "kong-gateway_route" "orion_route" {
  name = "orion"
  service = {
    id = kong-gateway_service.orion_service.id
  }

  paths         = ["/orion"]
  strip_path    = false
  preserve_host = true
}

# Create Kong services
resource "kong-gateway_upstream" "orion_upstream" {
  name = "orion"

}


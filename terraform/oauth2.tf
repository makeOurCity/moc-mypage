
resource "kong-gateway_plugin_oauth2" "pluginoauth2" {
  config = {
    accept_http_if_already_terminated = true
    enable_authorization_code         = true
    enable_client_credentials         = true
    enable_implicit_grant             = true
    enable_password_grant             = true
    reuse_refresh_token               = false
  }

  protocols = ["http", "https"]

  route = {
    id = kong-gateway_route.orion_route.id
  }
}

resource "kong-gateway_service" "comet_service" {
  name            = "comet"
  host            = "comet"
  port            = 8666
  protocol        = "http"
  retries         = 5
  connect_timeout = 60000
  write_timeout   = 60000
  read_timeout    = 60000
}

resource "kong-gateway_route" "comet_route" {
  name = "comet"
  service = {
    id = kong-gateway_service.comet_service.id
  }

  paths         = ["/comet"]
  strip_path    = true
  preserve_host = true
}

resource "kong-gateway_plugin_oauth2" "pluginoauth2_comet" {
  config = {
    global_credentials                = true
    accept_http_if_already_terminated = true
    enable_authorization_code         = true
    enable_client_credentials         = true
    enable_implicit_grant             = true
    enable_password_grant             = true
    reuse_refresh_token               = false
  }

  protocols = ["http", "https"]

  route = {
    id = kong-gateway_route.comet_route.id
  }
}

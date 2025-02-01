terraform {
  required_providers {
    kong = {
      source  = "kong/kong-gateway"
      version = "~> 0.3.0"
    }
  }
}

provider "kong" {
  server_url = "http://kong:8001"
}

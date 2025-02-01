variable "kong_admin_uri" {
  description = "Kong Admin API URI"
  type        = string
  default     = "http://kong:8001"
}

variable "kong_admin_token" {
  description = "Kong Admin API token"
  type        = string
  default     = ""
  sensitive   = true
}

variable "services" {
  description = "Kong services configuration"
  type = map(object({
    url  = string
    name = string
    routes = list(object({
      name          = string
      paths         = list(string)
      strip_path    = bool
      preserve_host = bool
    }))
  }))
  default = {}
}

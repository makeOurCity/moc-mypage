import axios from "axios";

const instance = axios.create({
  baseURL: "/api/moc",
  timeout: Number.parseInt(process.env.NEXT_PUBLIC_ORION_TIMEOUT || "10000"),
});

export function useMocApi() {
  return {
    mocApi: instance,
  };
}

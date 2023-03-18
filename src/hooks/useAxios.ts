import axios from "axios";
import { makeUseAxios } from "axios-hooks";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_ORION_BASE_URL,
  timeout: Number.parseInt(process.env.NEXT_PUBLIC_ORION_TIMEOUT || "10000")
});

export const useAxios = makeUseAxios({
  axios: instance,
});

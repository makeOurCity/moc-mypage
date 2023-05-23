import {
  EntitiesApiFactory,
  TypesApiFactory,
  SubscriptionsApiFactory,
} from "../../codegens/ngsiv2";
import axios from "axios";

const instance = axios.create({
  baseURL: `/api/orion`,
  timeout: Number.parseInt(process.env.NEXT_PUBLIC_ORION_TIMEOUT || "10000"),
});

const typesApi = TypesApiFactory(undefined, "", instance);
const entitiesApi = EntitiesApiFactory(undefined, "", instance);
const subscriptionsApi = SubscriptionsApiFactory(undefined, "", instance);

export function useNgsiV2() {
  return {
    api: {
      typesApi,
      entitiesApi,
      subscriptionsApi,
    },
  };
}

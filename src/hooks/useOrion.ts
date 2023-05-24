import {
  EntitiesApiFactory,
  TypesApiFactory,
  SubscriptionsApiFactory,
} from "../../codegens/ngsiv2";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { logger } from "@/logger";

const instance = axios.create({
  baseURL: `/api/orion`,
  timeout: Number.parseInt(process.env.NEXT_PUBLIC_ORION_TIMEOUT || "10000"),
});

const typesApi = TypesApiFactory(undefined, "", instance);
const entitiesApi = EntitiesApiFactory(undefined, "", instance);
const subscriptionsApi = SubscriptionsApiFactory(undefined, "", instance);

export function useOrion() {
  const setFiwareServiceHeader = (fiwareService: string) => {
    if (fiwareService) {
      logger.info("Set Fiware-Service", fiwareService);
      instance.defaults.headers["Fiware-Service"] = fiwareService;
    } else {
      logger.info("Delete Fiware-Service");
      delete instance.defaults.headers["Fiware-Service"];
    }
  };

  const resetFiwareService = () => {
    setFiwareServiceHeader("");
  };

  return {
    api: {
      typesApi,
      entitiesApi,
      subscriptionsApi,
    },
    setFiwareServiceHeader,
    resetFiwareService,
  };
}

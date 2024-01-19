import {
  EntitiesApiFactory,
  TypesApiFactory,
  SubscriptionsApiFactory,
} from "@/codegens/orion";
import axios, { AxiosError, AxiosResponse } from "axios";
import { logger } from "@/logger";
import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/react";
import { useEffect } from "react";

const instance = axios.create({
  baseURL: "/api/orion",
  timeout: Number.parseInt(process.env.NEXT_PUBLIC_ORION_TIMEOUT || "10000"),
});

const typesApi = TypesApiFactory(undefined, "", instance);
const entitiesApi = EntitiesApiFactory(undefined, "", instance);
const subscriptionsApi = SubscriptionsApiFactory(undefined, "", instance);

export const OrionInterceptor = (options: any) => {

  const router = useRouter();
  const toast = useToast();

  useEffect(() => {

      const interceptor = instance.interceptors.response.use(
        (response: AxiosResponse) => {
          return response
        },
        (error: AxiosError) => {
          switch (error.response?.status) {
            case 401:
              toast({
                title: "サインインが必要です",
                status: "error",
                description: "セッションが切断されました。再度サインインしてください",
                isClosable: true,
              });
              router.push("/")
              break
            default:
              break
          }
          return Promise.reject(error)
         }
      );

      return () => instance.interceptors.response.eject(interceptor);

  }, [router, toast])

  return options.children;
}

export function useOrion() {
  const setFiwareServiceHeader = (fiwareService: string) => {
    if (fiwareService) {
      logger.debug("Set Fiware-Service", fiwareService);
      instance.defaults.headers["Fiware-Service"] = fiwareService;
    } else {
      logger.debug("Delete Fiware-Service");
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

import { Layout } from "@/components/Layout";
import EntityFormLight from "@/components/orion/entity_form/EntityFormLight";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useOrion } from "@/hooks/useOrion";
import { FC, useEffect, useRef, useState } from "react";
import { Stack, Card, CardBody, CardHeader, Heading } from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";

const FiwareOrionEntitiesNew: FC = () => {
  const searchParams = useSearchParams();
  const paramType = searchParams.get("type") || "";
  const paramFiwareService = searchParams.get("fiwareService") || "";

  const [fiwareService] = useLocalStorage<string | undefined>(
    "fiware-service",
    undefined
  );

  const { api, setFiwareServiceHeader } = useOrion();

  const entityFormRef = useRef<any>();

  useEffect(() => {
    setFiwareServiceHeader(paramFiwareService || fiwareService || "");
    const fetch = async () => {
      const { data } = await api.typesApi.listEntityTypes();
      if (paramType) {
        const target = data.find((type) => type.type === paramType);
        if (target) {
          entityFormRef.current.handleSelectType(target);
        }
      }
    };
    fetch();
  }, [fiwareService, paramType, paramFiwareService]);

  return (
    <Layout>
      <Stack spacing={10}>
        <Card>
          <CardHeader>
            <Heading as="h1" size="md">
              新規Entity作成 ({paramType})
            </Heading>
          </CardHeader>

          <CardBody>
            <EntityFormLight
              onSuccess={() => {
                alert("新規作成しました");
              }}
              ref={entityFormRef}
            />
          </CardBody>
        </Card>
      </Stack>
    </Layout>
  );
};

export default FiwareOrionEntitiesNew;

import { Layout } from "@/components/Layout";
import EntityFormLight from "@/components/orion/entity_form/EntityFormLight";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useOrion } from "@/hooks/useOrion";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { Stack, Card, CardBody, CardHeader, Heading } from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import { uuidv7 } from "uuidv7";
import { ListEntityTypesResponse } from "@/codegens/orion";

const FiwareOrionEntitiesNew: FC = () => {
  const searchParams = useSearchParams();
  const paramType = searchParams.get("type") || "";
  const [fiwareService] = useLocalStorage<string | undefined>(
    "fiware-service",
    undefined
  );
  const setUUID = useCallback(() => {
    let id = uuidv7();
    if (paramType) {
      id = `urn:ngsild:${paramType}:${uuidv7()}`;
    }
    return id;
  }, []);

  const { api, setFiwareServiceHeader } = useOrion();

  const [targetData, setTargetData] =
    useState<ListEntityTypesResponse | null>();

  const entityFormRef = useRef<any>();

  useEffect(() => {
    setFiwareServiceHeader(fiwareService || "");
    const fetch = async () => {
      const { data } = await api.typesApi.listEntityTypes();
      if (paramType) {
        const target = data.find((type) => type.type === paramType);
        if (target) {
          setTargetData(target);
          entityFormRef.current.handleSelectType(target);
        }
      }
    };
    fetch();
  }, [fiwareService, searchParams]);

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
            <EntityFormLight ref={entityFormRef} />
          </CardBody>
        </Card>
      </Stack>
    </Layout>
  );
};

export default FiwareOrionEntitiesNew;

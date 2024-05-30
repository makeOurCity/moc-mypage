import { Layout } from "@/components/Layout";
import EntityForm from "@/components/orion/entity_form/EntityForm";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useOrion } from "@/hooks/useOrion";
import { FC, useEffect, useRef, useState } from "react";
import { Stack, Card, CardBody, CardHeader, Heading } from "@chakra-ui/react";
import TypeSelector from "@/components/orion/entity_form/TypeSelector";
import { useParams } from "next/navigation";

const FiwareOrionEntitiesNew: FC = () => {
  const params = useParams();
  const [fiwareService] = useLocalStorage<string | undefined>(
    "fiware-service",
    undefined
  );
  const [type, setType] = useState<string>("");

  const [initialData, setInitialData] = useState<any>();

  const { setFiwareServiceHeader, api } = useOrion();

  useEffect(() => {
    setFiwareServiceHeader(fiwareService || "");
  }, [fiwareService]);

  const entityFormRef = useRef<any>();

  useEffect(() => {
    const fetch = async () => {
      if (!params?.id || !fiwareService) return;
      const { data } = await api.entitiesApi.retrieveEntity(
        params.id.toString()
      );
      setType(data.type);
      setInitialData(data);
    };
    fetch();
  }, [params, fiwareService]);

  return (
    <Layout>
      <Stack spacing={10}>
        <Card>
          <CardHeader>
            <Heading as="h1" size="md">
              Entity編集
            </Heading>
          </CardHeader>

          <CardBody>
            <TypeSelector
              onChange={(data) => {
                entityFormRef.current.handleSelectType(data);
              }}
              value={type}
            />
            <EntityForm ref={entityFormRef} initialData={initialData} />
          </CardBody>
        </Card>
      </Stack>
    </Layout>
  );
};

export default FiwareOrionEntitiesNew;

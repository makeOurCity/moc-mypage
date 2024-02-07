import { Layout } from "@/components/Layout";
import EntityForm from "@/components/orion/entity_form/EntityForm";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useOrion } from "@/hooks/useOrion";
import { FC, useEffect, useRef, useState } from "react";
import { Stack, Card, CardBody, CardHeader, Heading } from "@chakra-ui/react";
import TypeSelector from "@/components/orion/entity_form/TypeSelector";

const FiwareOrionEntitiesNew: FC = () => {
  const [fiwareService] = useLocalStorage<string | undefined>(
    "fiware-service",
    undefined
  );
  const [type, setType] = useState<string>("");

  const { setFiwareServiceHeader } = useOrion();

  useEffect(() => {
    setFiwareServiceHeader(fiwareService || "");
  }, [fiwareService]);

  const entityFormRef = useRef<any>();

  return (
    <Layout>
      <Stack spacing={10}>
        <Card>
          <CardHeader>
            <Heading as="h1" size="md">
              新規Entity作成
            </Heading>
          </CardHeader>

          <CardBody>
            <TypeSelector
              onChange={(data) => {
                entityFormRef.current.handleSelectType(data);
              }}
              value={type}
            />
            <EntityForm ref={entityFormRef} />
          </CardBody>
        </Card>
      </Stack>
    </Layout>
  );
};

export default FiwareOrionEntitiesNew;

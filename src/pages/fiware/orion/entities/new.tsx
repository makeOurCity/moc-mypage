import { Layout } from "@/components/Layout";
import EntityForm from "@/components/orion/entity_form/EntityForm";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useOrion } from "@/hooks/useOrion";
import { FC, useEffect } from "react";
import { Stack, Card, CardBody, CardHeader, Heading } from "@chakra-ui/react";

const FiwareOrionEntitiesNew: FC = () => {
  const [fiwareService] = useLocalStorage<string | undefined>(
    "fiware-service",
    undefined
  );

  const { setFiwareServiceHeader } = useOrion();

  useEffect(() => {
    setFiwareServiceHeader(fiwareService || "");
  }, [fiwareService]);

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
          <EntityForm />
          </CardBody>
        </Card>
      </Stack>
    </Layout>
  );
};

export default FiwareOrionEntitiesNew;

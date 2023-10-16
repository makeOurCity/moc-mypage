import { Layout } from "@/components/Layout";
import EntityForm from "@/components/orion/entity_form/EntityForm";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useOrion } from "@/hooks/useOrion";
import { FC, useEffect } from "react";

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
      <EntityForm />
    </Layout>
  );
};

export default FiwareOrionEntitiesNew;

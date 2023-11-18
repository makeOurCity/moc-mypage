import { Layout } from "@/components/Layout";
import EntityForm from "@/components/orion/entity_form/EntityForm";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useOrion } from "@/hooks/useOrion";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ListEntitiesResponse } from "../../../../../codegens/orion";

const EntityId: NextPage = () => {
  const { api, setFiwareServiceHeader } = useOrion();
  const { id } = useRouter().query;
  const [fiwareService, setFiwareService, loadingLocalStorage] =
    useLocalStorage<string | undefined>("fiware-service", undefined);
  const [entity, setEntity] = useState<ListEntitiesResponse>();

  const updateEntity = useCallback(() => {
    if (!id) return;
    if (fiwareService) {
      setFiwareServiceHeader(fiwareService);
    }

    api.entitiesApi.retrieveEntity(id as string).then((res) => {
      console.log(res.data);
      setEntity(res.data);
    });
  }, [loadingLocalStorage, id]);

  useEffect(() => {
    if (loadingLocalStorage === false) {
      updateEntity();
    }
  }, [loadingLocalStorage]);

  const defaultData = useMemo(() => {
    if (!entity) return;
    return Object.keys(entity)
      .filter((key) => !["id", "type"].includes(key))
      .map((key) => {
        return {
          type: (entity as any)[key].type,
          key: key,
          value: (entity as any)[key].value,
        };
      });
  }, [entity]);

  console.log(defaultData);

  return (
    <Layout>
      {defaultData && (
        <EntityForm
          defaultId={id?.toString()}
          defaultType={entity?.type}
          defaultData={defaultData}
        />
      )}
    </Layout>
  );
};

export default EntityId;

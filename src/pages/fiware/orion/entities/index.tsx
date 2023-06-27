import { Layout } from "@/components/Layout";
import MultiTenancyForm from "@/components/orion/MultITenancyForm";
import EntityList from "@/components/orion/EntityList";
import { useOrion } from "@/hooks/useOrion";
import { logger } from "@/logger";
import { Button, FormControl, Heading, Stack, Icon } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { FiRefreshCw } from "react-icons/fi";
import { ListEntitiesResponse, ListEntityTypesResponse } from "../../../../../codegens/orion";

export default function FiwareOrionTypesIndex() {
  const { api, setFiwareServiceHeader } = useOrion();
  const [list, setList] = useState<ListEntitiesResponse[]>([]);

  /**
   * Fiware-Serviceが変更された際の挙動
   */
  const updateList = useCallback((fiwareService?: string) => {
    logger.info("Update type list ", fiwareService);

    if (fiwareService) {
      setFiwareServiceHeader(fiwareService);
    }
    api.entitiesApi.listEntities().then((res) => {
      setList(res.data)
    });
  }, [api.entitiesApi, setFiwareServiceHeader]);

  /**
   * 更新ボタンクリック時の挙動
   */
  const onClickHandler = useCallback(() => {
    api.entitiesApi.listEntities().then((res) => {
      setList(res.data)
    });
  }, [api.entitiesApi]);

  return (
    <Layout>
      <Stack spacing={10}>
        <Heading as="h1" size="lg">
          エンティティ
          <Button onClick={onClickHandler}><Icon as={FiRefreshCw} /></Button>
        </Heading>
        <EntityList data={list} />
      </Stack>
    </Layout>
  );
}

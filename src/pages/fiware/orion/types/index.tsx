import { Layout } from "@/components/Layout";
import MultiTenancyForm from "@/components/ngsiv2/MultITenancyForm";
import TypeList from "@/components/ngsiv2/TypeList";
import { useOrion } from "@/hooks/useOrion";
import { logger } from "@/logger";
import { Button, FormControl, Heading, Stack, Icon } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { FiRefreshCw } from "react-icons/fi";
import { ListEntityTypesResponse } from "../../../../../codegens/ngsiv2";

export default function FiwareOrionTypesIndex() {
  const { api } = useOrion();
  const [list, setList] = useState<ListEntityTypesResponse[]>([]);

  const updateList = useCallback(() => {
    logger.info("Update type list");
    api.typesApi.listEntityTypes().then((res) => {
      setList(res.data)
    });
  }, [api.typesApi]);

  return (
    <Layout>
      <Stack spacing={10}>
        <Heading as="h1" size="lg">テナント</Heading>
        <Heading as="h2" size="md">マルチテナントの設定</Heading>
        <MultiTenancyForm onSubmitFiwareService={updateList} />
        <Heading as="h2" size="md">タイプ一覧<Button onClick={updateList}>
          <Icon as={FiRefreshCw} /></Button>
        </Heading>
        <TypeList data={list} />
      </Stack>
    </Layout>
  );
}

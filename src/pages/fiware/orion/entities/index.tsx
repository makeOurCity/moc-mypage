import { Layout } from "@/components/Layout";
import MultiTenancyForm from "@/components/orion/MultITenancyForm";
import EntityList from "@/components/orion/EntityList";
import { useOrion } from "@/hooks/useOrion";
import { logger } from "@/logger";
import {
  Button,
  FormControl,
  Heading,
  Stack,
  Icon,
  Box,
  Card,
  CardHeader,
  CardBody,
  Text,
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { FiRefreshCw } from "react-icons/fi";
import {
  ListEntitiesResponse,
  ListEntityTypesResponse,
} from "../../../../../codegens/orion";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export default function FiwareOrionTypesIndex() {
  const { api, setFiwareServiceHeader } = useOrion();
  const [list, setList] = useState<ListEntitiesResponse[]>([]);
  const [fiwareService, setFiwareService, loadingLocalStorage] =
    useLocalStorage<string | undefined>("fiware-service", undefined);

  /**
   * 更新ボタンクリック時の挙動
   */
  const updateList = useCallback(() => {
    logger.info("Update entity list ", fiwareService);

    if (fiwareService) {
      setFiwareServiceHeader(fiwareService);
    }

    api.entitiesApi.listEntities().then((res) => {
      setList(res.data);
    });
  }, [loadingLocalStorage]);

  useEffect(() => {
    if (loadingLocalStorage === false) {
      updateList();
    }
  }, [loadingLocalStorage]);

  return (
    <Layout>
      <Stack spacing={10}>
        <Card>
          <CardHeader>
            <Heading as="h1" size="md">
              エンティティ一覧 &nbsp;
              <Button variant="ghost" onClick={updateList}>
                <Icon as={FiRefreshCw} />
              </Button>
            </Heading>
            <Text>Fiware-Service: {fiwareService}</Text>
          </CardHeader>
          <CardBody>
            <EntityList data={list} />
          </CardBody>
        </Card>
      </Stack>
    </Layout>
  );
}

import { Layout } from "@/components/Layout";
import EntityList from "@/components/orion/EntityList";
import { useOrion } from "@/hooks/useOrion";
import { logger } from "@/logger";
import {
  Button,
  Heading,
  Stack,
  Icon,
  Card,
  CardHeader,
  CardBody,
  Text,
  Flex,
  Box,
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { FiRefreshCw } from "react-icons/fi";
import { ListEntitiesResponse } from "../../../../../codegens/orion";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import Link from "next/link";

export default function FiwareOrionEntitiesIndex() {
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
            <Flex justifyContent="space-between">
              <Box>
                <Heading as="h1" size="md">
                  エンティティ一覧 &nbsp;
                  <Button variant="ghost" onClick={updateList}>
                    <Icon as={FiRefreshCw} />
                  </Button>
                </Heading>
                <Text>Fiware-Service: {fiwareService}</Text>
              </Box>
              <Box>
                <Link href="/fiware/orion/entities/new">
                  <Button>新規Entity</Button>
                </Link>
              </Box>
            </Flex>
          </CardHeader>
          <CardBody>
            <EntityList data={list} />
          </CardBody>
        </Card>
      </Stack>
    </Layout>
  );
}

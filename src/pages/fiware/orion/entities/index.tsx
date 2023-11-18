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
  Input,
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
  const [type, setType] = useState<string | undefined>(undefined);

  /**
   * 更新ボタンクリック時の挙動
   */
  const updateList = useCallback(() => {
    logger.info("Update entity list ", fiwareService);

    if (fiwareService) {
      setFiwareServiceHeader(fiwareService);
    }

    api.entitiesApi
      .listEntities(undefined, type ? type : undefined)
      .then((res) => {
        setList(res.data);
      });
  }, [loadingLocalStorage, type]);

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
              <Stack rowGap={2}>
                <Heading as="h1" size="md">
                  エンティティ一覧 &nbsp;
                  <Button variant="ghost" onClick={updateList}>
                    <Icon as={FiRefreshCw} />
                  </Button>
                </Heading>
                <Text>Fiware-Service: {fiwareService}</Text>
                <Flex gap={2}>
                  Type:
                  <Input
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    size="sm"
                  />
                </Flex>
              </Stack>
              <Box>
                <Link href="/fiware/orion/entities/new">
                  <Button>新規Entity</Button>
                </Link>
              </Box>
            </Flex>
          </CardHeader>
          <CardBody mr={5}>
            <EntityList data={list} />
          </CardBody>
        </Card>
      </Stack>
    </Layout>
  );
}

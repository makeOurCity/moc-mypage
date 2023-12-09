import { Layout } from "@/components/Layout";
import { useOrion } from "@/hooks/useOrion";
import { logger } from "@/logger";
import {
  Button,
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
  ListSubscriptionsResponse,
} from "../../../../../codegens/orion";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import SubscriptionList from "@/components/orion/subscription/SubscriptionList";

export default function FiwareOrionSubscriptionsIndex() {
  const { api, setFiwareServiceHeader } = useOrion();
  const [list, setList] = useState<ListSubscriptionsResponse[]>([]);
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

    api.subscriptionsApi.listSubscriptions().then((res) => {
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
              サブスクリプション一覧 &nbsp;
              <Button variant="ghost" onClick={updateList}>
                <Icon as={FiRefreshCw} />
              </Button>
            </Heading>
            <Text>Fiware-Service: {fiwareService}</Text>
          </CardHeader>
          <CardBody>
            <SubscriptionList data={list} onDeleted={updateList} />
          </CardBody>
        </Card>
      </Stack>
    </Layout>
  );
}

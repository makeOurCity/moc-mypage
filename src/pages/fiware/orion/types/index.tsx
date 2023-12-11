import { Layout } from "@/components/Layout";
import MultiTenancyForm from "@/components/orion/MultITenancyForm";
import TypeList from "@/components/orion/TypeList";
import { useOrion } from "@/hooks/useOrion";
import { logger } from "@/logger";
import {
  Button,
  FormControl,
  Heading,
  Stack,
  Icon,
  Card,
  CardHeader,
  CardBody,
  Spacer,
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { FiRefreshCw } from "react-icons/fi";
import { ListEntityTypesResponse } from "@/codegens/orion";

export default function FiwareOrionTypesIndex() {
  const { api, setFiwareServiceHeader } = useOrion();
  const [list, setList] = useState<ListEntityTypesResponse[]>([]);

  /**
   * Fiware-Serviceが変更された際の挙動
   */
  const updateList = useCallback(
    (fiwareService?: string) => {
      logger.info("Update type list ", fiwareService);

      if (fiwareService) {
        setFiwareServiceHeader(fiwareService);
      }
      api.typesApi.listEntityTypes().then((res) => {
        setList(res.data);
      });
    },
    [api.typesApi, setFiwareServiceHeader]
  );

  /**
   * 更新ボタンクリック時の挙動
   */
  const onClickHandler = useCallback(() => {
    api.typesApi.listEntityTypes().then((res) => {
      setList(res.data);
    });
  }, []);

  return (
    <Layout>
      <Stack spacing={10}>
        <Card>
          <CardHeader>
            <Heading as="h1" size="md">
              マルチテナント設定
            </Heading>
          </CardHeader>
          <CardBody>
            {/* <Heading as="h2" size="md">マルチテナントの設定</Heading> */}
            <MultiTenancyForm onSubmitFiwareService={updateList} />
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <Heading as="h2" size="md">
              テナントのタイプ一覧 &nbsp;
              <Button variant="ghost" onClick={onClickHandler}>
                <Icon as={FiRefreshCw} />
              </Button>
            </Heading>
          </CardHeader>
          <CardBody>
            <TypeList data={list} />
          </CardBody>
        </Card>
      </Stack>
    </Layout>
  );
}

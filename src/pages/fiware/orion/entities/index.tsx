import { Layout } from "@/components/Layout";
import EntityList from "@/components/orion/entity/EntityList";
import { useOrion } from "@/hooks/useOrion";
import { logger } from "@/logger";
import {
  Button,
  Heading,
  Stack,
  Card,
  CardHeader,
  CardBody,
  Text,
  Flex,
  Input,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { ListEntitiesResponse } from "@/codegens/orion";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import Link from "next/link";
import { Controller, useFieldArray, useForm } from "react-hook-form";

interface FormProps {
  type: string;
  attributes: {
    key: string;
    value: string;
  }[];
}

export default function FiwareOrionEntitiesIndex() {
  const { api, setFiwareServiceHeader } = useOrion();
  const [list, setList] = useState<ListEntitiesResponse[]>([]);
  const [fiwareService, setFiwareService, loadingLocalStorage] =
    useLocalStorage<string | undefined>("fiware-service", undefined);

  const { control, handleSubmit } = useForm<FormProps>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "attributes",
  });

  /**
   * 更新ボタンクリック時の挙動
   */
  const updateList = useCallback(
    (data: FormProps) => {
      logger.info("Update entity list ", fiwareService);

      if (fiwareService) {
        setFiwareServiceHeader(fiwareService);
      }

      const _ = undefined;

      const type = data.type;

      const attributes = data.attributes
        .filter((attr) => attr.key && attr.value)
        .map((attr) => `${attr.key}~=${attr.value}`)
        .join(";");

      api.entitiesApi
        .listEntities(
          _,
          type ? type : _,
          _,
          _,
          attributes ? attributes : _,
          _,
          _,
          _,
          _,
          100,
          _,
          _
        )
        .then((res) => {
          setList(res.data);
        });
    },
    [loadingLocalStorage]
  );

  useEffect(() => {
    if (loadingLocalStorage === false) {
      updateList({
        type: "",
        attributes: [],
      });
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
                </Heading>
                <Text>Fiware-Service: {fiwareService}</Text>

                <form onSubmit={handleSubmit(updateList)}>
                  <VStack gap={2} align="stretch">
                    <HStack gap={2}>
                      <Text>Type:</Text>
                      <Controller
                        control={control}
                        name="type"
                        render={({ field }) => <Input {...field} size="sm" />}
                      />
                    </HStack>
                    {fields.map((field, index) => (
                      <HStack key={field.id} gap={2}>
                        <Controller
                          control={control}
                          name={`attributes.${index}.key`}
                          render={({ field }) => (
                            <Input
                              {...field}
                              size="sm"
                              placeholder="プロパティ名"
                            />
                          )}
                        />
                        <Controller
                          control={control}
                          name={`attributes.${index}.value`}
                          render={({ field }) => (
                            <Input {...field} size="sm" placeholder="値" />
                          )}
                        />
                        <Button
                          size="sm"
                          colorScheme="red"
                          onClick={() => remove(index)}
                        >
                          削除
                        </Button>
                      </HStack>
                    ))}
                    <Button
                      w="full"
                      colorScheme="gray"
                      size="sm"
                      onClick={() => append({ key: "", value: "" })}
                    >
                      条件を追加
                    </Button>
                    <Button w="full" colorScheme="blue" type="submit" size="sm">
                      検索
                    </Button>
                  </VStack>
                </form>
              </Stack>
              <Flex gap={2}>
                <Link href="/fiware/orion/entities/csv">
                  <Button>CSVインポート</Button>
                </Link>
                <Link href="/fiware/orion/entities/new">
                  <Button>新規Entity</Button>
                </Link>
              </Flex>
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

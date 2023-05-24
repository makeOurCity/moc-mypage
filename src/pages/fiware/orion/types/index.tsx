import { Layout } from "@/components/Layout";
import MultiTenancyForm from "@/components/ngsiv2/MultITenancyForm";
import TypeList from "@/components/ngsiv2/TypeList";
import { useOrion } from "@/hooks/useOrion";
import { Heading, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ListEntityTypesResponse } from "../../../../../codegens/ngsiv2";

export default function FiwareOrionTypesIndex() {
  const { api } = useOrion();
  const [list, setList] = useState<ListEntityTypesResponse[]>([]);

  useEffect(() => {
    api.typesApi.listEntityTypes().then((res) => {
      setList(res.data)
    });
  }, [api.typesApi])

  return (
    <Layout>
      <Stack spacing={10}>
        <Heading as="h1" size="lg">テナント</Heading>
        <Heading as="h2" size="md">マルチテナントの設定</Heading>
        <MultiTenancyForm />
        <Heading as="h2" size="md">タイプ一覧</Heading>
        <TypeList data={list} />
      </Stack>
    </Layout>
  );
}

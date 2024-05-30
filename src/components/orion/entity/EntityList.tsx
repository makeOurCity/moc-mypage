import {
  Box,
  Button,
  Flex,
  Grid,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useCallback, useMemo, useState } from "react";
import { CodeBlock } from "react-code-blocks";
import { ListEntitiesResponse } from "@/codegens/orion";
import { useOrion } from "@/hooks/useOrion";
import Link from "next/link";

type Props = {
  data: ListEntitiesResponse[];
};

export default function EnityList({ data }: Props) {
  const {
    api: { entitiesApi },
  } = useOrion();
  const [selectedEntityId, selectEntityId] = useState<string>();

  const selectedData = useMemo(() => {
    return data.find((d) => d.id === selectedEntityId);
  }, [data, selectedEntityId]);

  const list = data.map((t) => {
    return (
      <Tr
        _hover={{ bg: "blue.50" }}
        cursor="pointer"
        key={t.id}
        onClick={() => selectEntityId(t.id)}
      >
        <Td>{t.id}</Td>
        <Td>{t.type}</Td>
      </Tr>
    );
  });

  const deleteEntity = useCallback(async () => {
    const confirm = window.confirm("本当に削除しますか？");
    if (!confirm) return;
    try {
      if (!selectedEntityId) return;
      await entitiesApi.removeEntity(selectedEntityId);
    } catch (error) {
      alert(error);
    }
  }, [selectedEntityId]);

  return (
    <Grid gridTemplateColumns="50% 50%" gap={5} pr={2}>
      <TableContainer>
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>タイプ</Th>
            </Tr>
          </Thead>
          <Tbody>{list}</Tbody>
        </Table>
      </TableContainer>
      <Box>
        <Flex justifyContent="flex-end" mb={2} gap={2}>
          <Link href={`/fiware/orion/entities/${selectedEntityId}/edit`}>
            <Button colorScheme="blue" size="sm">
              編集
            </Button>
          </Link>
          <Button colorScheme="red" size="sm" onClick={deleteEntity}>
            削除
          </Button>
        </Flex>
        <CodeBlock
          text={JSON.stringify(selectedData, null, 4)}
          language="json"
          showLineNumbers={true}
        />
      </Box>
    </Grid>
  );
}

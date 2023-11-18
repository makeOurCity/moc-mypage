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
import Link from "next/link";
import { useMemo, useState } from "react";
import { CodeBlock } from "react-code-blocks";
import { ListEntitiesResponse } from "../../../codegens/orion";

type Props = {
  data: ListEntitiesResponse[];
};

export default function EnityList({ data }: Props) {
  const [selectedEntityId, selectEntityId] = useState<string>();

  const selectedData = useMemo(() => {
    return data.find((d) => d.id === selectedEntityId);
  }, [data, selectedEntityId]);

  const list = data.map((t) => {
    return (
      <Tr key={t.id} onClick={() => selectEntityId(t.id)}>
        <Td>{t.id}</Td>
        <Td>{t.type}</Td>
      </Tr>
    );
  });

  return (
    <Grid gridTemplateColumns="50% 50%" gap={5}>
      <TableContainer>
        <Table variant="striped" size="sm">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>タイプ</Th>
            </Tr>
          </Thead>
          <Tbody>{list}</Tbody>
        </Table>
      </TableContainer>
      <Box mt={5}>
        <Flex justifyContent="end" mb={2}>
          <Link href={`/fiware/orion/entities/${selectedEntityId}`}>
            <Button>編集</Button>
          </Link>
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

import { Center, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { ListEntitiesResponse, ListEntityTypesResponse } from "../../../codegens/orion";

type Props = {
  data: ListEntitiesResponse[];
};

export default function EnityList({ data }: Props) {

  const list = data.map((t) => {
    return (
      <Tr key={t.type}>
        <Td>{ t.id }</Td>
        <Td>{ t.type }</Td>
      </Tr>
    )
  });

  return (
    <Center>
      <TableContainer>
        <Table variant="striped" size="sm">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>タイプ</Th>
            </Tr>
          </Thead>
          <Tbody>
            { list }
          </Tbody>
        </Table>
      </TableContainer>
    </Center>
  );
}

import { Center, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { ListEntityTypesResponse } from "../../../codegens/orion";

type Props = {
  data: ListEntityTypesResponse[];
};

export default function TypeList({ data }: Props) {

  const list = data.map((t) => {
    return (
      <Tr key={t.type}>
        <Td>{ t.type }</Td>
        {/* <Td>{ JSON.stringify(t.attrs) }</Td> */}
        <Td isNumeric>{ t.count }</Td>
      </Tr>
    )
  });

  return (
    <Center>
      <TableContainer>
        <Table variant="striped" size="sm">
          <Thead>
            <Tr>
              <Th>タイプ名</Th>
              {/* <Th>型</Th> */}
              <Th>データ数</Th>
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

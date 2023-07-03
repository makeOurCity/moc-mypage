import {
  Center,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import {
  ListEntitiesResponse,
  ListEntityTypesResponse,
  ListSubscriptionsResponse,
} from "../../../codegens/orion";
import SubscriptionDeleteButton from "./SubscriptionDeleteButton";

type Props = {
  data: ListSubscriptionsResponse[];
};

export default function SubscriptionList({ data }: Props) {
  const deleteButton = SubscriptionDeleteButton();

  const list = data.map((t) => {
    return (
      <Tr key={t.id}>
        <Td>{t.id}</Td>
        <Td>{t.status}</Td>
        <Td>{t.description}</Td>
        <Td>{t.expires || "なし"}</Td>
        <Td>{deleteButton}</Td>
      </Tr>
    );
  });

  return (
    <Center>
      <TableContainer>
        <Table variant="striped" size="sm">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>ステータス</Th>
              <Th>説明</Th>
              <Th>期限</Th>
              <Th>アクション</Th>
            </Tr>
          </Thead>
          <Tbody>{list}</Tbody>
        </Table>
      </TableContainer>
    </Center>
  );
}

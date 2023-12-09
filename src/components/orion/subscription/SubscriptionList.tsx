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
} from "../../../../codegens/orion";
import { useOrion } from "@/hooks/useOrion";
import DeleteButton from "../DeleteButton";

type Props = {
  data: ListSubscriptionsResponse[];
  onDeleted?(id: string): void;
};

export default function SubscriptionList({ data, onDeleted }: Props) {
  const { api } = useOrion();

  const onAccept = async (id: string): Promise<void> => {
    await api.subscriptionsApi.deleteSubscription(id);
    if (onDeleted) {
      onDeleted(id);
    }
  };

  const list = data.map((t) => {
    return (
      <Tr key={t.id}>
        <Td>{t.id}</Td>
        <Td>{t.status}</Td>
        <Td>{t.description}</Td>
        <Td>{t.expires || "なし"}</Td>
        <Td>
          <DeleteButton id={t.id} onAccept={onAccept} />
        </Td>
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

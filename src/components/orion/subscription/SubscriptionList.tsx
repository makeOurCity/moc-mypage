import {
  Box,
  Center,
  Grid,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import {
  ListEntitiesResponse,
  ListEntityTypesResponse,
  ListSubscriptionsResponse,
} from "@/codegens/orion";
import { useOrion } from "@/hooks/useOrion";
import DeleteButton from "../DeleteButton";
import { CodeBlock } from "react-code-blocks";
import { useMemo, useState } from "react";

type Props = {
  data: ListSubscriptionsResponse[];
  onDeleted?(id: string): void;
};

export default function SubscriptionList({ data, onDeleted }: Props) {
  const toast = useToast();
  const { api } = useOrion();
  
  const [selectedEntityId, selectEntityId] = useState<string>();
  const selectedData = useMemo(() => {
    return data.find((d) => d.id === selectedEntityId);
  }, [data, selectedEntityId]);

  const onAccept = async (id: string): Promise<void> => {
    const response = await api.subscriptionsApi.deleteSubscription(id);
    if (response.status == 204) {
      if (onDeleted) {
        onDeleted(id);
      }
      toast({
        title: "Subscriptionの削除",
        description: "Subscriptionの削除に成功しました。",
        status: "success",
        isClosable: true,
      })
    }
  };

  const list = data.map((t) => {
    return (
      <Tr _hover={{ bg: "red.50" }} cursor="pointer" key={t.id} onClick={() => selectEntityId(t.id)}>
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
    <Grid gridTemplateColumns="50% 50%" gap={5}>
      <TableContainer>
        <Table size="sm">
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
      <Box mt={5}>
        <CodeBlock
          text={JSON.stringify(selectedData, null, 4)}
          language="json"
          showLineNumbers={true}
        />
      </Box>
    </Grid>
  );
}

import {
  Card, CardBody, CardHeader, Heading, TableContainer, Table, Tbody, Td, Th, Thead, Tr,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";

interface DataTableCardProps {
  title: string;
  data?: {[key:string]: string};
}

export default function DataTableCard({ title, data }: DataTableCardProps) {

  const list = data ? Object.keys(data).map((key) => {
    return (
      <Tr key={key}>
        <Td>{key}</Td>
        <Td>{data[key]}</Td>
      </Tr>
    );
  }) : null;

  return (
    <Card>
      <CardHeader>
        <Heading as="h1" size="md">
          { title }
        </Heading>
      </CardHeader>
      <CardBody>

        <TableContainer>
          <Table variant="striped" size="sm">
            <Thead>
              <Tr>
                <Th>キー</Th>
                <Th>値</Th>
              </Tr>
            </Thead>
            <Tbody>
              { list }
            </Tbody>
          </Table>
        </TableContainer>
      </CardBody>
    </Card>
  );
}

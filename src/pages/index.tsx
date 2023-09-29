import { Inter } from "next/font/google";
import { Layout } from "@/components/Layout";
import { useSession } from "next-auth/react";
import { useMocApi } from "@/hooks/useMocApi";
import {  useState } from "react";
import MocAppInfoTable from "@/components/moc/AppInfoTable";
import MocTokenTable from "@/components/moc/TokenTable";
import { SimpleGrid } from "@chakra-ui/react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: session, status: loading } = useSession();
  const { mocApi } = useMocApi();

  const [basicData, setBasicData] = useState<{[key:string]: string}>({});

  const cards = [];

  if (session) {
    cards.push(
      <MocAppInfoTable key="appInfoTable" />
    );

    cards.push(
      <MocTokenTable />
    )
  }

  return (
    <Layout>
      <SimpleGrid spacing={4}>
        { cards }
      </SimpleGrid>
    </Layout>
  );
}

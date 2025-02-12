import { Inter } from "next/font/google";
import { Layout } from "@/components/Layout";
import { useSession } from "next-auth/react";
import { useMocApi } from "@/hooks/useMocApi";
import React, { useState } from "react";
import MocAppInfoTable from "@/components/moc/AppInfoTable";
import MocTokenTable from "@/components/moc/TokenTable";
import { SimpleGrid } from "@chakra-ui/react";
import MoCTutorialCard from "@/components/moc/TutorialCard";
import { Environments } from "@/libs/environments";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: session, status: loading } = useSession();
  const { mocApi } = useMocApi();

  const [basicData, setBasicData] = useState<{[key:string]: string}>({});

  const cards = [];

  if (session) {

    if (Environments.getTutorialUrl()) {
      cards.push(
        <MoCTutorialCard />
      )
    }

    if (Environments.getMocApiBaseUrl()) {
      cards.push(
        <MocAppInfoTable key="appInfoTable" />
      );
    }

    cards.push(
      <MocTokenTable />
    )
  }

  return (
    <Layout>
      <SimpleGrid spacing={4}>
        { cards.map((card, i) => { return <React.Fragment key={i}>{card}</React.Fragment> }) }
      </SimpleGrid>
    </Layout>
  );
}

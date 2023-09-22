import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import LoginButton from "@/components/LoginButton";
import { Layout } from "@/components/Layout";
import { useSession } from "next-auth/react";
import DataTableCard from "@/components/card/DataTable";
import { useMocApi } from "@/hooks/useMocApi";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: session, status: loading } = useSession();
  const { mocApi } = useMocApi();

  const [basicData, setBasicData] = useState<{[key:string]: string}>({});

  useEffect(() => {
    // if (!session) return;

    mocApi.get('/api/info').then((res) => {
      setBasicData(res.data);
    })
  }, []);

  return (
    <Layout>
      <DataTableCard title="接続情報" data={basicData} />
    </Layout>
  );
}

import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import LoginButton from "@/components/LoginButton";
import { Layout } from "@/components/Layout";
import { useSession } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: session, status: loading } = useSession();
  return (
    <Layout>
      {/* <LoginButton/> */}
    </Layout>
  );
}

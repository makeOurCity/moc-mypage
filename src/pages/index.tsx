import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import LoginButton from '@/components/login-btn'
import { Layout } from '@/components/layout'
import {useSession} from "next-auth/react";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const {data: session, status: loading} = useSession();
  return (
    <Layout>
      <h1>sample</h1>
    </Layout>
  )
}

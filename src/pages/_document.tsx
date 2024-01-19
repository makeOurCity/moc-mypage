/* eslint-disable @next/next/no-title-in-document-head */
import { Environments } from '@/libs/environments'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>{ Environments.getTitle() }</title>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

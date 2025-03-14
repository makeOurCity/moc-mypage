import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import Script from "next/script";
import "@/styles/globals.css";
import { OrionInterceptor } from "@/hooks/useOrion";

// Use the <SessionProvider> to improve performance and allow components that call
// `useSession()` anywhere in your application to access the `session` object.
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script
        src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"
        strategy="beforeInteractive"
      />
      <Script
        src="https://www.postman.com/collection/widget.js"
        strategy="afterInteractive"
      />
      <ChakraProvider>
        <SessionProvider
          // Provider options are not required but can be useful in situations where
          // you have a short session maxAge time. Shown here with default values.
          session={pageProps.session}
        >
          <OrionInterceptor>
            <Component {...pageProps} />
          </OrionInterceptor>
        </SessionProvider>
      </ChakraProvider>
    </>
  );
}

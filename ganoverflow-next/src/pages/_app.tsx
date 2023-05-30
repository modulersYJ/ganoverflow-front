import { RecoilRoot } from "recoil";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Analytics } from "@vercel/analytics/react";
import "@/styles/globals.css";
// import { QueryClient, QueryClientProvider } from "react-query";
// import { ReactQueryDevtools } from "react-query/devtools";

// const client = new QueryClient({
//   defaultOptions: {
//     queries: {
//       refetchOnWindowFocus: false,
//     },
//   },
// });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      {/* <QueryClientProvider client={client}> */}
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>AI·GHT - 트렌디한 최고의 AI 서비스 모음 아잇</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />

      {/* <Analytics /> */}
      {/* </QueryClientProvider> */}
    </RecoilRoot>
  );
}

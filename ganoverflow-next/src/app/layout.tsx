import Header from "@/components/ui/layouts/Header";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";

const siteTitle = "최고의 머시깽이, GanOverflow";
const siteDescription = "Gan Overflow는 ...입니당. 최고의 경험을 누려보세요!";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: `%s | ${siteTitle}`,
    default: siteTitle,
  },
  description: siteDescription,
  icons: {
    icon: "/favicon.ico",
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
  // home: boolean,
  // offFooter: boolean,
}) {
  return (
    <html
      lang="en"
      className={`${inter.className} h-full scroll-smooth antialiased`}
    >
      {/* <CapsulizedHead /> */}
      {/* <RecoilRoot> */}
      <body className="flex min-h-full flex-col">
        <Header />
        <main className="grow">{children}</main>
        {/* {!offFooter &&  */}
        {/* <Footer /> */}
        {/* } */}
      </body>
      {/* </RecoilRoot> */}
    </html>
  );
}

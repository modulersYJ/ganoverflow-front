import { Inter } from "next/font/google";
import Landing from "./landing";

const inter = Inter({ subsets: ["latin"] });

export default function MainPage() {
  return (
    <div
      className={`${inter.className} flex min-h-screen w-full flex-col items-center p-8 bg-black`}
    >
      <Landing />
    </div>
  );
}

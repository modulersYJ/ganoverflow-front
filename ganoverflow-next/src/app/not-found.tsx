import { ErrorLottie } from "@/components/ui/Error/ErrorLottie";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center align-middle">
      <div className="w-full">
        <ErrorLottie />
        {/* <LoadingLottie /> */}
      </div>
      <h1 className="font-notoSansKR font-extrabold text-5xl">
        아무것도 없네요!
      </h1>
      <button className="bg-emerald-400 w-28 px-3 py-2 m-auto mt-[60px] rounded-md text-black">
        <Link href="/">홈으로</Link>
      </button>
    </div>
  );
}

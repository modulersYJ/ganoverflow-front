import { ConstructingLottie } from "@/components/ui/Lottie/Constructing/ConstructingLottie";
import Link from "next/link";

export default function PromptPage() {
  return (
    <div className="flex flex-col justify-center align-middle">
      <div className="w-full">
        <ConstructingLottie />
      </div>
      <h1>바쁘게 준비중이에요!</h1>

      <button
        className="
      bg-secondary
      w-28
      px-3
      py-2.5
      m-auto
      mt-[60px]
      rounded-md
      !text-black
      "
      >
        <Link href="/">홈으로</Link>
      </button>
    </div>
  );
}

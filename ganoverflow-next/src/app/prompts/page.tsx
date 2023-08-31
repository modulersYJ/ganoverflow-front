import { ConstructingLottie } from "@/components/ui/Lottie/Constructing/ConstructingLottie";
import Link from "next/link";

export default function PromptPage() {
  return (
    <div className="flex flex-col justify-center align-middle">
      <div className="w-full">
        <ConstructingLottie />
      </div>
      <h2>
        <span className="!text-secondary">Prompt 스토어</span>를
      </h2>
      <h2 className="mt-2">바쁘게 준비중이에요!</h2>

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

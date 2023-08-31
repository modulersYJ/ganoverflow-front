import Link from "next/link";
import {
  LogoAnimate,
  Lottie_ArrowDown,
  Lottie_NatureBottom,
} from "./components";

const Section1 = () => {
  return (
    <section className="sec-1 w-full h-[100vh]">
      <div className="w-full h-[30vh]">
        <LogoAnimate />
      </div>

      <Link href="/chat">
        <button className="z-30 absolute left-1/2 transform -translate-x-1/2 mt-[10%] bg-secondary w-40 px-5 py-4 rounded-full !text-black !text-lg">
          시작하기
        </button>
      </Link>
      <Lottie_NatureBottom />
      <Lottie_ArrowDown />
    </section>
  );
};

export default Section1;

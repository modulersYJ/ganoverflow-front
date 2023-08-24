import { LogoAnimate } from "./components";
import Link from "next/link";

const Landing = () => {
  return (
    <div className="w-full h-full flex flex-row justify-center">
      <div className="w-11/12 h-full">
        <section className="w-full h-full">
          <div className="w-full h-[30vh]">
            <LogoAnimate />
          </div>

          <Link href="/chat">
          <button className="z-30 absolute left-1/2 transform -translate-x-1/2 mt-[10%] bg-secondary w-40 px-5 py-4 rounded-full !text-black !text-lg">
            시작하기
          </button>
          </Link>
        </section>

        <section className="h-[100vh] w-full"></section>
      </div>
    </div>
  );
};

export default Landing;

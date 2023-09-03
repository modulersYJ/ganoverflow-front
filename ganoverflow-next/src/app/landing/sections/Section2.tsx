"use client";
import Link from "next/link";
import { TextSwapLoop } from "./components";
import React, { useEffect, useState } from "react";
import RankPostDashboard, {
  DAILY_PROMPT_GUIDE,
  HOT_THREAD_DUMMY,
} from "./components/RankPostDashboard";
import { styleTransitionColor } from "@/app/posts/layout";

const Section2 = () => {
  const [opacity, setOpacity] = useState(1);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = document.querySelector(".sec-1") as HTMLElement;
    const section1Height = element.offsetHeight;

    const fadeOut = () => {
      if (!isIntersecting) return;

      const section3 = document.querySelector(".sec-3");
      if (section3) {
        const rect = section3.getBoundingClientRect();
        let actualTop = rect.top + section1Height;

        if (window.scrollY > actualTop) {
          let newOpacity = 1 - (window.scrollY - actualTop) / rect.height;
          if (newOpacity < 0) newOpacity = 0;
          setOpacity(newOpacity);
        }
      }
    };

    window.addEventListener("scroll", fadeOut);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsIntersecting(entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );

    const section3 = document.querySelector(".sec-3");
    if (section3) {
      observer.observe(section3);
    }

    return () => {
      window.removeEventListener("scroll", fadeOut);
    };
  }, [isIntersecting]);

  return (
    <section
      className="sec-2 sticky top-20 h-full w-full"
      style={{ opacity, visibility: opacity === 0 ? "hidden" : "visible" }}
    >
      <div className="h-full flex flex-col justify-between ">
        <div className="h-full flex flex-col gap-3">
          <div className="sec-title flex flex-col gap-3">
            <TextSwapLoop />
          </div>
          <div>
            <br />
            <p className=" text-center !text-md sm:!text-lg">
              GANoverflow는 AI 대화내역, 활용 능력을 체계적으로 기록/보존,
              그리고 쉽게 커뮤니티에 공유할 수 있도록 지원하며
              <br className="hidden lg:block" />
              <span className="text-secondary"> 당신의 새로운 능력</span>이 널리
              인정받을 수 있는 생태계를 만들어 갈 것입니다.
            </p>
          </div>

          <div className="dashboards mt-5 flex flex-col lg:flex-row justify-between h-full w-full gap-12">
            <div className="dashboard-1 w-full h-full">
              <label className="tw-subtitle !text-lg sm:!text-xl !text-zinc-400 w-full">
                오늘 핫한 스레드
              </label>
              <div className="trending w-full rounded-2xl bg-zinc-900 px-5 sm:px-14 py-5 mt-3 flex flex-col gap-4 border-[1px] border-secondary">
                <div className="flex flex-col justify-between w-full gap-7 sm:gap-1">
                  {HOT_THREAD_DUMMY.map((post, idx) => (
                    <RankPostDashboard key={idx} post={post} index={idx} />
                  ))}
                </div>
                <button
                  className={`w-full h-11 border-2 border-zinc-400 rounded-full text-center flex justify-center items-center mt-2 hover:bg-zinc-600  ${styleTransitionColor}`}
                >
                  <Link href="/posts">
                    <span>스레드 더보기</span>
                  </Link>
                </button>
              </div>
            </div>

            <div className="dashboard-2 w-full h-full hidden md:block">
              <label className="tw-subtitle !text-lg sm:!text-xl !text-zinc-400 w-full">
                오늘의 프롬프트 가이드
              </label>
              <div className="trending w-full rounded-2xl bg-zinc-900 px-5 sm:px-14 py-5 mt-3 flex flex-col gap-4 border-[1px] border-secondary">
                <div className="flex flex-col justify-between w-full gap-7 sm:gap-1">
                  {DAILY_PROMPT_GUIDE.map((post, idx) => (
                    <RankPostDashboard key={idx} post={post} index={idx} />
                  ))}
                </div>
                <button
                  className={`w-full h-11 border-2 border-zinc-400 rounded-full text-center flex justify-center items-center mt-2 hover:bg-zinc-600  ${styleTransitionColor}`}
                >
                  <Link href="/prompts">
                    <span>더 많은 가이드 보러가기</span>
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section2;

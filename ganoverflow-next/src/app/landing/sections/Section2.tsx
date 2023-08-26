"use client";
import Link from "next/link";
import { TextSwapLoop } from "./components";
import React, { useEffect, useState } from "react";

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
            {/* <p className=" text-center !text-md sm:!text-lg">
              우리는 AI 시대를 맞아, 본질에 더욱 근접한 좋은 질문을 던지는 것이
              얼마나 중요한 경쟁력인지 알아가고 있습니다.
            </p> */}
            {/* <p className=" text-center !text-md sm:!text-lg">
              좋은 질의를 이어가는 것은 시대가 요구하는 가장 핵심적인 능력 중
              하나로 부상했으며, 그 추세는 더욱 선명해지고 있습니다.
            </p> */}
            <br />
            <p className=" text-center !text-md sm:!text-lg">
              GANoverflow는 AI와의 대화를 체계적으로 기록/보존, 그리고 쉽게
              커뮤니티에 공유할 수 있도록 지원하며
              <br className="hidden lg:block" />
              <span className="text-secondary"> 당신의 새로운 능력</span>이 널리
              인정받을 수 있는 생태계를 만들어 갈 것입니다.
            </p>
          </div>
          <div className="dashboards mt-5 flex flex-col lg:flex-row justify-between h-full w-full gap-12">
            <div className="dashboard-1 w-full h-full">
              <label className="tw-subtitle !text-2xl !text-zinc-500 w-full">
                오늘 많이 본 스레드
              </label>
              <div className="trending w-full rounded-2xl bg-zinc-900 px-14 py-5 mt-4 flex flex-col gap-4">
                <div className="flex flex-col justify-between w-full gap-4">
                  <div className="post-container flex flex-row justify-evenly w-full gap-5">
                    <h1 className="!text-zinc-600">1</h1>

                    <div className="w-full flex flex-col justify-between gap-2">
                      <p className="tw-subtitle !text-[1rem] text-left">{`Tailwind를 이용한 디자인 시스템`}</p>
                      <div className="post-meta flex flex-row items-center justify-start gap-4">
                        <div className="user-img w-7 h-7 rounded-full bg-zinc-500" />
                        <span className="user-nickname !font-bold">수평</span>
                        <span className="post-category text-zinc-600 !text-xs !font-normal">
                          프로그래밍
                        </span>
                        <div className="h-[55%] w-[1px] bg-zinc-600" />
                        <span className="post-date text-zinc-600 !text-xs !font-normal">
                          2일 전
                        </span>
                      </div>
                      <div></div>
                    </div>
                  </div>
                  <div className="post-container flex flex-row justify-evenly w-full gap-5">
                    <h1 className="!text-zinc-600">2</h1>

                    <div className="w-full flex flex-col justify-between gap-2">
                      <p className="tw-subtitle !text-[1rem] text-left">{`Tailwind를 이용한 디자인 시스템`}</p>
                      <div className="post-meta flex flex-row items-center justify-start gap-4">
                        <div className="user-img w-7 h-7 rounded-full bg-zinc-500" />
                        <span className="user-nickname !font-bold">수평</span>
                        <span className="post-category text-zinc-600 !text-xs !font-normal">
                          프로그래밍
                        </span>
                        <div className="h-[55%] w-[1px] bg-zinc-600" />
                        <span className="post-date text-zinc-600 !text-xs !font-normal">
                          2일 전
                        </span>
                      </div>
                      <div></div>
                    </div>
                  </div>
                  <div className="post-container flex flex-row justify-evenly w-full gap-5">
                    <h1 className="!text-zinc-600">3</h1>

                    <div className="w-full flex flex-col justify-between gap-2">
                      <p className="tw-subtitle !text-[1rem] text-left">{`Tailwind를 이용한 디자인 시스템`}</p>
                      <div className="post-meta flex flex-row items-center justify-start gap-4">
                        <div className="user-img w-7 h-7 rounded-full bg-zinc-500" />
                        <span className="user-nickname !font-bold">수평</span>
                        <span className="post-category text-zinc-600 !text-xs !font-normal">
                          프로그래밍
                        </span>
                        <div className="h-[55%] w-[1px] bg-zinc-600" />
                        <span className="post-date text-zinc-600 !text-xs !font-normal">
                          2일 전
                        </span>
                      </div>
                      <div></div>
                    </div>
                  </div>
                </div>
                <button className="w-full h-11 border-2 border-zinc-400 rounded-full text-center flex justify-center items-center mt-2">
                  <Link href="/posts">
                    <span>아티클 더보기</span>
                  </Link>
                </button>
              </div>
            </div>
            <div className="dashboard-1 w-full h-full">
              <label className="tw-subtitle !text-2xl !text-zinc-500 w-full">
                오늘 많이 본 스레드
              </label>
              <div className="trending w-full rounded-2xl bg-zinc-900 px-14 py-5 mt-4 flex flex-col gap-4">
                <div className="flex flex-col justify-between w-full gap-4">
                  <div className="post-container flex flex-row justify-evenly w-full gap-5">
                    <h1 className="!text-zinc-600">1</h1>

                    <div className="w-full flex flex-col justify-between gap-2">
                      <p className="tw-subtitle !text-[1rem] text-left">{`Tailwind를 이용한 디자인 시스템`}</p>
                      <div className="post-meta flex flex-row items-center justify-start gap-4">
                        <div className="user-img w-7 h-7 rounded-full bg-zinc-500" />
                        <span className="user-nickname !font-bold">수평</span>
                        <span className="post-category text-zinc-600 !text-xs !font-normal">
                          프로그래밍
                        </span>
                        <div className="h-[55%] w-[1px] bg-zinc-600" />
                        <span className="post-date text-zinc-600 !text-xs !font-normal">
                          2일 전
                        </span>
                      </div>
                      <div></div>
                    </div>
                  </div>
                  <div className="post-container flex flex-row justify-evenly w-full gap-5">
                    <h1 className="!text-zinc-600">2</h1>

                    <div className="w-full flex flex-col justify-between gap-2">
                      <p className="tw-subtitle !text-[1rem] text-left">{`Tailwind를 이용한 디자인 시스템`}</p>
                      <div className="post-meta flex flex-row items-center justify-start gap-4">
                        <div className="user-img w-7 h-7 rounded-full bg-zinc-500" />
                        <span className="user-nickname !font-bold">수평</span>
                        <span className="post-category text-zinc-600 !text-xs !font-normal">
                          프로그래밍
                        </span>
                        <div className="h-[55%] w-[1px] bg-zinc-600" />
                        <span className="post-date text-zinc-600 !text-xs !font-normal">
                          2일 전
                        </span>
                      </div>
                      <div></div>
                    </div>
                  </div>
                  <div className="post-container flex flex-row justify-evenly w-full gap-5">
                    <h1 className="!text-zinc-600">3</h1>

                    <div className="w-full flex flex-col justify-between gap-2">
                      <p className="tw-subtitle !text-[1rem] text-left">{`Tailwind를 이용한 디자인 시스템`}</p>
                      <div className="post-meta flex flex-row items-center justify-start gap-4">
                        <div className="user-img w-7 h-7 rounded-full bg-zinc-500" />
                        <span className="user-nickname !font-bold">수평</span>
                        <span className="post-category text-zinc-600 !text-xs !font-normal">
                          프로그래밍
                        </span>
                        <div className="h-[55%] w-[1px] bg-zinc-600" />
                        <span className="post-date text-zinc-600 !text-xs !font-normal">
                          2일 전
                        </span>
                      </div>
                      <div></div>
                    </div>
                  </div>
                </div>
                <button className="w-full h-11 border-2 border-zinc-400 rounded-full text-center flex justify-center items-center mt-2">
                  <Link href="/posts">
                    <span>아티클 더보기</span>
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

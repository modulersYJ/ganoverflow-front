"use client";
import { Lottie_SEO } from "./components";
import React, { useEffect, useRef } from "react";

const Section4 = () => {
  const elementsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fadeInDown");
          } else {
            entry.target.classList.remove("fadeInDown");
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -150px 0px",
        threshold: 0.1,
      }
    );

    elementsRef.current.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section className="sec-4 h-[90vh] w-full">
      <div className="h-full flex flex-col-reverse md:flex-row justify-between">
        <Lottie_SEO />

        <div className="h-full flex flex-col gap-12">
          <div className="sec-title flex flex-col gap-3">
            <h1 className="text-left !text-3xl sm:!text-5xl md:!text-6xl">
              <div className="block lg:inline-block text-center md:text-left">
                <span className="!text-secondary">
                  <span className="text-[#4285F4]">검</span>
                  <span className="text-[#EA4335]">색</span>
                  <span className="text-[#FBBC05]">엔</span>
                  <span className="text-[#34A853]">진</span>
                </span>
                을<span> 정복하자!</span>
              </div>{" "}
            </h1>
          </div>
          <div>
            <p
              className="text-center md:text-left !text-md sm:!text-lg "
              ref={(item) => (elementsRef.current[0] = item!)}
            >
              하루에도 몇번씩 우리는 새로운 문제를 마주하고, 전문가에게 도움을
              구합니다.
              <br className="hidden lg:block" />
              아직 세상에는 잘 알려지지 않은, 폐쇄적이거나 찾아보기 어려운
              문제와 정보가 너무나도 많습니다.
            </p>
            <br />
            <p
              className="text-center md:text-left !text-md sm:!text-lg"
              ref={(item) => (elementsRef.current[1] = item!)}
            >
              우리는 실제로 유용하고 널리 인정받는 양질의 AI 대화를 검색엔진에
              노출시켜 많은 사람에게 도움을 주고 싶습니다.
              <br className="hidden lg:block" />
              <br className="hidden lg:block" />
              고도화된 SEO 전략을 고민하며, 이런 수많은
              <strong> UNKNOWN </strong>
              문제에 대해 더 개방적이며 적극적인 논의의 장을 제시하겠습니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section4;

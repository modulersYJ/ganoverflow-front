"use client";
import Link from "next/link";
import { ServiceVideo } from "./components";

import React, { useEffect, useState, useRef } from "react";

const Section3 = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative h-[250vh]">
      <div ref={sectionRef} className="sec-3 h-full sticky top-20 w-full">
        <ServiceVideo />
        <Section3_2 />
      </div>
    </div>
  );
};

const Section3_2 = () => {
  return (
    <div
      className="sticky top-20 z-[45] h-[38%] mt-0 md:mt-40 bg-black bg-opacity-75"
      style={{
        width: "100%",
      }}
    >
      <div className="sec-3-2 flex flex-col gap-10 mx-auto font-oswald w-full h-full py-[5%] sm:py-16 px-[0%] sm:px-[15%]">
        <h1 className="text-center !text-xl sm:!text-3xl md:!text-3xl lg:!text-5xl">
          <p className="text-secondary">유용한 AI 대화내역,</p>
          <p>간편하게 기록하고 관리하세요</p>
        </h1>
        <Paragraph>
          당신이 AI와 나누는 대화, 그리고 머리를 탁 치게 만드는 양질의 AI답변을
          잘 기록하고 관리하고 계신가요? 창의적인 생성형 AI는 똑같은 질의에도
          매번 다른 답변을 제시합니다.
        </Paragraph>
        <Paragraph>
          다시 같은 문제에 직면했을 때, 내가 이미 도출해냈던 잘 기록된 검증된
          답변을 조회 할지, 똑같은 해결책에 도달하기 위한 질의의 시행착오를 다시
          한번 거칠지, 저울질 해보지 않아도 무엇이 더 효율적인지 알 수 있습니다.
        </Paragraph>
        <Paragraph>
          GANoverflow 팀은 당신이 도출해낸{" "}
          <span className="text-secondary">
            AI의 답변을 체계적으로 기록, 관리 할 수 있는 수단을 지원
          </span>
          하고, 당신의 생산성을 높이기 위한 비전을 발전시키고 있습니다.
        </Paragraph>
        <Link href="/chat">
        <button
          className={`self-center md:self-end mt-14 w-32 px-5 py-3 rounded-full !text-lg !font-bold border-2 hover:bg-zinc-700 transition-colors duration-300 ease-in-out`}
        >
          시작하기
        </button>
        </Link>
      </div>
    </div>
  );
};

export default Section3;

const Paragraph = ({ children }: any) => (
  <p className="text-center !text-md sm:!text-lg">{children}</p>
);

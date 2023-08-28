"use client";
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
      className="sticky top-20 z-[45] h-[38%] mt-40"
      style={{
        width: "100%",
        opacity: "80%",
        backgroundColor: "black",
      }}
    >
      <div className="sec-3-2 flex flex-col gap-10 mx-auto font-oswald w-full h-full py-16 px-[15%]">
        <h1 className="text-center !text-xl sm:!text-3xl md:!text-3xl lg:!text-5xl">
          <p>유용한 AI 대화내역,</p>
          <p>간편하게 기록하고 관리하세요</p>
        </h1>
        <Paragraph>
          당신이 AI와 나누는 대화, 그리고 머리를 탁 치게 만드는 양질의 AI답변을
          잘 기록하고 관리하고 계신가요? 창의적인 생성형 AI는 똑같은 질의에도
          매번 다른 답변을 제시합니다.
        </Paragraph>
        <Paragraph>
          다시 같은 문제에 직면했을 때, 내가 이미 도출해냈던 잘 기록된 검증된
          답변을 조회할지, 똑같은 해결책에 도달하기 위한 질의의 시행착오를 다시
          한번 거칠지, 저울질 해보지 않아도 무엇이 더 효율적인지 알 수 있습니다.
        </Paragraph>
        <Paragraph>
          우리는 불친절한 생성형 AI서비스의 기록 및 관리체계 때문에 재사용
          가능한 양질의 답변을 도출하고서도, 휘발성으로 사용하고 잊어버리기
          일쑤입니다. GANoverflow 팀은 당신이 도출해낸 AI의 답변을 체계적으로
          기록, 관리할 수 있는 수단을 지원하고, 당신의 생산성을 높이기 위한
          비전을 발전시키고 있습니다.
        </Paragraph>
      </div>
    </div>
  );
};

export default Section3;

const Paragraph = ({ children }: any) => (
  <p className="text-center !text-md sm:!text-lg">{children}</p>
);

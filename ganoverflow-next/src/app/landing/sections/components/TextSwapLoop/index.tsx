"use client";
import React, { useEffect, useState } from "react";
import "./index.css";

const phraseData = [
  { text: "당신의 새로운 능력", width: "sm:w-[420px]" },
  { text: "AI시대의 나침반", width: "sm:w-[400px]" },
  { text: "생산성의 새 차원", width: "sm:w-[410px]" },
  { text: "hack your AI", width: "sm:w-[390px]" },
];

const TextSwapLoop = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(-1);
  const [currentWidth, setCurrentWidth] = useState(phraseData[0].width);

  useEffect(() => {
    const timer = setInterval(() => {
      setPrevIndex(currentIndex);
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % phraseData.length;
        setCurrentWidth(phraseData[nextIndex].width);
        return nextIndex;
      });
    }, 3000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <h1 className="relative h-[80px] textSlider text-center !text-2xl sm:!text-4xl md:!text-5xl">
      <span className="relative text-secondary">Prompt</span>
      <span>, </span>

      <span
        className={`widthChange block sm:inline-block sm:relative 
        w-[60%] ${currentWidth} `}
        style={{ height: "40px" }}
      >
        {phraseData.map((phrase, index) => (
          <span
            key={index}
            className={`
              absolute
              
              left-0
              opacity-0
              sm:absolute
              sm:top-0
              sm:left-0
              sm:opacity-0

              w-full
              h-full
              ml-[0px]
              sm:ml-[-15px]
              ${index === currentIndex ? "slideIn" : ""}
              ${index === prevIndex ? "slideOut" : ""}
            `}
          >
            {phrase.text}
          </span>
        ))}
      </span>
    </h1>
  );
};

export default TextSwapLoop;

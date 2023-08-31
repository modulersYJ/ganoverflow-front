"use client";
import Lottie from "lottie-react";
import thinkingHuman from "./lottie_thinking-human.json";
import { useState, useEffect } from "react";

const LottieCommunity = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="lottie-wrapper absolute right-[5%] top-[-80%] z-5 w-[140px]">
      <Lottie
        style={{
          willChange: "opacity",
          width: "100%",
          height: "100%",
          opacity: loaded ? 1 : 0,
          transition: "opacity 3s ease-out",
        }}
        animationData={thinkingHuman}
        loop={true}
      />
    </div>
  );
};

export default LottieCommunity;

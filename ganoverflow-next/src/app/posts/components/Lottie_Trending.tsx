"use client";
import Lottie from "lottie-react";
import trending from "./lottie_trending.json";
import { useState, useEffect } from "react";

const LottieTrending = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="lottie-wrapper absolute z-5 w-[85px] top-[-25px]">
      <Lottie
        style={{
          willChange: "opacity",
          width: "100%",
          height: "100%",
          opacity: loaded ? 1 : 0,
          transition: "opacity 3s ease-out",
        }}
        animationData={trending}
        loop={true}
      />
    </div>
  );
};

export default LottieTrending;

"use client";
import Lottie from "lottie-react";
import arrowDown from "./lottie_arrow-down.json";
import { useState, useEffect } from "react";

const ArrowDown = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <Lottie
      style={{
        width: "100%",
        height: "300px",
        opacity: loaded ? 1 : 0,
        transition: "opacity 3s ease-out",
        fill: "#12D761",
        color: "#12D761",
      }}
      animationData={arrowDown}
      loop={true}
    />
  );
};

export default ArrowDown;

"use client";
import Lottie from "lottie-react";
import natureBottom from "./lottie_nature-bottom.json";
import { useState, useEffect } from "react";

const NatureBottom = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <Lottie
      style={{
        width: "100%",
        height: "400px",
        opacity: loaded ? 1 : 0,
        transition: "opacity 3s ease-out",
      }}
      animationData={natureBottom}
      loop={true}
    />
  );
};

export default NatureBottom;

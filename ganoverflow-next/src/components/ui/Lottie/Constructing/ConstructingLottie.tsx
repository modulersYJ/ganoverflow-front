"use client";
import Lottie from "lottie-react";
import constructing from "./lottie_constructing.json";
import { useEffect, useState } from "react";

export const ConstructingLottie = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);
  return (
    <>
      <Lottie
        style={{
          width: "100%",
          height: "400px",
          opacity: loaded ? 1 : 0,
          transition: "opacity 3s ease-out",
        }}
        animationData={constructing}
        loop={true}
      />
    </>
  );
};

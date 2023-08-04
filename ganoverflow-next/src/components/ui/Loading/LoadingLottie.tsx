"use client";
import Lottie from "lottie-react";
import loadingAnimation from "./lottie_loading.json";
export const LoadingLottie = () => {
  return (
    <>
      <Lottie
        style={{ width: "400px", height: "400px" }}
        animationData={loadingAnimation}
        loop={true}
      />
    </>
  );
};

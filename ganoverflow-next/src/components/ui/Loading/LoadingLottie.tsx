"use client";
import Lottie from "lottie-react";
import loadingAnimation from "./lottie_loading.json";
export const LoadingLottie = () => {
  return (
    <>
      <Lottie
        style={{ width: "100%", height: "400px" }}
        animationData={loadingAnimation}
        loop={true}
      />
    </>
  );
};

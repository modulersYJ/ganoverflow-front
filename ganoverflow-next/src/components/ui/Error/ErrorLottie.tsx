"use client";
import Lottie from "lottie-react";
import errorAnimation from "./lottie_error.json";
export const ErrorLottie = () => {
  return (
    <>
      <Lottie
        style={{ width: "400px", height: "400px" }}
        animationData={errorAnimation}
        loop={true}
      />
    </>
  );
};

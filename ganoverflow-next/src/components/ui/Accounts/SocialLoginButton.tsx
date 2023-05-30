import React from "react";
import Image from "next/image";

type Props = {
  provider: "kakao" | "naver" | "google";
};

const SocialLoginButton: React.FC<Props> = ({ provider }) => {
  const images = {
    kakao: "/kakao-logo.png",
    naver: "/naver-logo.png",
    google: "/google-logo.png",
  };

  const labels = {
    kakao: "카카오로 로그인",
    naver: "네이버로 로그인",
    google: "구글로 로그인",
  };

  return (
    <button
      type="button"
      className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      <span className="sr-only">{labels[provider]}</span>
      <Image className="h-6 w-6" src={images[provider]} alt={provider} />
    </button>
  );
};

export default SocialLoginButton;

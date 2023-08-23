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
    kakao: "카카오 로그인",
    naver: "네이버 로그인",
    google: "구글로 로그인",
  };

  return (
    <button
      type="button"
      className="w-full flex justify-center gap-3 py-2.5 px-4 bg-transparent border-solid border rounded-full border-gray-300"
    >
      <Image src={images[provider]} alt={provider} width={24} height={24} />
      <span className="">{labels[provider]}</span>
    </button>
  );
};

export default SocialLoginButton;

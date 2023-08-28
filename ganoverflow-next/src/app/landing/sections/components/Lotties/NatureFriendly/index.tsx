"use client";
import Lottie from "lottie-react";
import ecoAnimation from "./lottie_nature-friendly.json";
import { useEffect, useState } from "react";

const NatureFriendly = () => {
  const [inView, setInView] = useState(false);

  const checkScroll = () => {
    const element = document.getElementById("lottie_nature-friendly");
    if (element) {
      const rect = element.getBoundingClientRect();
      const isInView = rect.top >= 0 && rect.bottom <= window.innerHeight;
      setInView(isInView);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", checkScroll);
    checkScroll();
    return () => {
      window.removeEventListener("scroll", checkScroll);
    };
  }, []);

  return (
    <Lottie
      id="lottie_nature-friendly"
      className="mt-[-80px] md:mt-[-50px]"
      style={{
        minWidth: "50%",
        height: "400px",
        opacity: inView ? 1 : 0,
        transition: "opacity 1.5s ease-out",
      }}
      animationData={ecoAnimation}
      loop={true}
    />
  );
};

export default NatureFriendly;

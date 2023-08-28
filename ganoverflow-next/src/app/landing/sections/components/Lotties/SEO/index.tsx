"use client";
import React, { useEffect, useState, useRef } from "react";
import Lottie from "lottie-react";
import seo from "./lottie_seo.json";
import useWillChange from "@/hooks/useWillChange";

const SEO = () => {
  const [inView, setInView] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useWillChange(wrapperRef, "opacity", inView);

  const checkScroll = () => {
    const element = wrapperRef.current;
    if (element) {
      const rect = element.getBoundingClientRect();
      const isInView = rect.top >= 0 && rect.bottom <= window.innerHeight;
      setInView(isInView);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", checkScroll);
    checkScroll(); // initial check

    return () => {
      window.removeEventListener("scroll", checkScroll);
    };
  }, []);

  return (
    <div
      className="lottie_seo-wrapper"
      ref={wrapperRef}
      style={{ width: "85%", height: "400px" }}
    >
      <Lottie
        style={{
          width: "100%",
          height: "100%",
          opacity: inView ? 1 : 0,
          transition: "opacity 1.5s ease-out",
        }}
        animationData={seo}
        loop={true}
      />
    </div>
  );
};

export default SEO;

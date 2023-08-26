"use client";
import React, { useEffect, useRef } from "react";

const ServiceVideo = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoRef.current?.play();
          } else {
            videoRef.current?.pause();
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.5, // 50% 이상 보일 때 재생
      }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    // Cleanup
    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  return (
    <div className="z-40 sticky top-20">
      <video
        className="rounded-2xl"
        ref={videoRef}
        src="/gof-chat-core.webm"
        width="100%"
        controls={false}
        muted={true}
        loop={true}
      />
    </div>
  );
};

export default ServiceVideo;

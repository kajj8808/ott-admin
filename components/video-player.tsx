"use client";

import { getAverageColor } from "@/lib/utile";
import { ChangeEvent, CSSProperties, useEffect, useRef, useState } from "react";

const futureOffset = 5; // 미래 프레임 시간 오프셋(3초 후 프레임을 예측)
const blendSpeed = 0.3; // 트랜지션 속도 (0.1은 느리게, 0.5는 빠르게 전환)

interface VideoPlayerProps {
  videoUrl: string;
  vttUrl: string;
}
export default function VideoPlayer({ videoUrl, vttUrl }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const futureCanvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = 0.2;
    }
    const interval = setInterval(() => {
      videoTimeUpdate();
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const videoTimeUpdate = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const futureCanvas = futureCanvasRef.current;
    if (video && canvas) {
      const ctx = canvas?.getContext("2d");

      ctx?.drawImage(video, 0, 0, canvas?.width, canvas?.height);
    }
    if (video && futureCanvas) {
      const futureTime = video.currentTime + futureOffset;
      if (futureTime < video.duration) {
        const ctx = futureCanvas?.getContext("2d");

        const tempVideo = document.createElement("video");

        tempVideo.src = videoUrl;
        tempVideo.currentTime = futureTime;

        tempVideo.addEventListener(
          "seeked",
          () => {
            ctx?.drawImage(
              tempVideo,
              0,
              0,
              futureCanvas.width,
              futureCanvas.height,
            );
            tempVideo.remove();
          },
          { once: true },
        );
      }
    }
  };

  return (
    <div className="flex h-dvh w-full flex-col items-center justify-center">
      <div className="relative aspect-video">
        <video
          ref={videoRef}
          autoPlay={true}
          controls
          crossOrigin="anonymous"
          defaultValue={0.2}
          preload="auto"
          className="relative top-0 z-40 aspect-video max-w-2xl rounded-xl"
        >
          <source src={videoUrl} />
          <track
            src={vttUrl}
            kind="subtitles"
            srcLang="kr"
            label="한국어"
            default
          />
        </video>
        <canvas
          ref={canvasRef}
          className="absolute top-0 z-30 aspect-video size-full scale-125 overflow-clip border blur-3xl"
          width={320}
          height={180}
        />

        <canvas
          ref={futureCanvasRef}
          className="absolute top-0 z-30 aspect-video size-full scale-125 overflow-clip opacity-100 blur-3xl"
          width={320}
          height={180}
        />
      </div>
    </div>
  );
}

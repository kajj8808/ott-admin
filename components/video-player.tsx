"use client";

import { useEffect, useRef, useState } from "react";

interface VideoPlayerProps {
  videoUrl: string;
  vttUrl: string;
}
export default function VideoPlayer({ videoUrl, vttUrl }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [currentTime, setCurrentTime] = useState(0);

  // const futureCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = 0.2;
    }
    /* const interval = setInterval(() => {
      videoTimeUpdate();
    }, 3000);
    return () => {
      clearInterval(interval);
    }; */
  }, []);

  const drawImageFromVideo = (
    canvas: HTMLCanvasElement,
    video: HTMLVideoElement,
  ) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    //  ctx.imageSmoothingEnabled = true;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  };

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    const interval = setInterval(() => {
      if (video && canvas) {
        setCurrentTime(video.currentTime);
        drawImageFromVideo(canvas, video);
      }
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

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
          className="z-30 aspect-video size-32 scale-125 overflow-clip"
          width={320}
          height={180}
        />
        {/*         <canvas
          ref={futureCanvasRef}
          className="absolute top-0 z-30 aspect-video size-full scale-125 overflow-clip opacity-100 blur-3xl"
          width={320}
          height={180}
        /> */}
      </div>
    </div>
  );
}

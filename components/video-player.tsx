"use client";

import { getAverageColor } from "@/lib/utile";
import { useEffect, useRef, useState } from "react";

interface VideoPlayerProps {
  videoUrl: string;
}
export default function VideoPlayer({ videoUrl }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [averageColor, setAverageColor] = useState({ r: 0, g: 0, b: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      if (video && canvas) {
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
        const frameData = ctx?.getImageData(
          0,
          0,
          canvas.width,
          canvas.height,
        ).data;
        if (frameData) {
          const rgbColor = getAverageColor(frameData);

          setAverageColor(rgbColor);
        }
      }
    }, 333.333333);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <video controls ref={videoRef} autoPlay={true} crossOrigin="anonymous">
        <source src={videoUrl} />
      </video>
      <canvas
        ref={canvasRef}
        className="aspect-square border"
        width={320}
        height={180}
      />
      <div
        className="size-10"
        style={{
          backgroundColor: `rgb(${averageColor.r} , ${averageColor.g} , ${averageColor.b})`,
        }}
      ></div>
    </div>
  );
}

"use client";

import { getAverageColor } from "@/lib/utile";
import { ChangeEvent, useEffect, useRef, useState } from "react";

interface VideoPlayerProps {
  videoUrl: string;
  vttUrl: string;
}
export default function VideoPlayer({ videoUrl, vttUrl }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const progressBarRef = useRef<HTMLInputElement | null>(null);

  const [isClient, setIsClient] = useState(false);
  const [averageColor, setAverageColor] = useState({ r: 0, g: 0, b: 0 });

  const [progress, setProgress] = useState(0);

  const [previewImage, setPreviewImage] = useState("");

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

    setIsClient(true);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = 0.3;
    }
  }, [isClient]);

  const onTimeUpdate = () => {
    if (videoRef.current) {
      // 현재 재생 되고 있는 초
      const currentTime = videoRef.current.currentTime;
      // 영상의 총길이 (초)
      const duration = videoRef.current.duration;
      const percent = (currentTime / duration) * 100;

      setProgress(percent);
    }
  };

  const onRangeInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      setProgress(+e.target.value);
      const newTime = (+e.target.value / 100) * videoRef.current?.duration;
      videoRef.current.currentTime = newTime;
      captureVideoFrame(newTime);
    }
  };

  const captureVideoFrame = async (time: number) => {
    if (videoRef.current) {
      const video = videoRef.current;
      const canvas = document.createElement("canvas");
      canvas.width = 180;
      canvas.height = 92;

      const currentTime = video.currentTime;
      video.currentTime = time;
      console.log(currentTime);

      const ctx = canvas.getContext("2d");
      ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
      setPreviewImage(canvas.toDataURL());

      video.currentTime = currentTime;
    }
  };

  const onProgressbarMouseMove = () => {
    if (progressBarRef.current && videoRef.current) {
      /*  let hoverTime = (
        ((e.clientX - e.target.offsetLeft) / e.target.clientWidth) *
        videoRef?.current?.duration
      ).toFixed(2); */
      /*       captureVideoFrame(+hoverTime);
      console.log(hoverTime); */
      // console.log(e.clientX / e.target);
      /* const hoverTime = e.clientX - e.target.off */
      // const x = e.clientX - rect.left;
    }
  };

  return (
    <div>
      {isClient ? (
        <div>
          <video
            ref={videoRef}
            autoPlay={true}
            controls
            crossOrigin="anonymous"
            defaultValue={0.2}
            preload="auto"
            onTimeUpdate={onTimeUpdate}
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
          <input
            type="range"
            min={0}
            max={100}
            value={progress}
            ref={progressBarRef}
            onMouseMove={onProgressbarMouseMove}
            onChange={onRangeInputChange}
          />
        </div>
      ) : null}
      <div
        style={{
          background: `url(${previewImage})`,
        }}
        className="size-32 bg-red-200"
      ></div>
    </div>
  );
}

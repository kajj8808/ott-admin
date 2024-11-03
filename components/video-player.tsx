"use client";

import { useEffect, useRef } from "react";

interface VideoPlayerProps {
  videoUrl: string;
  vttUrl: string;
}
export default function VideoPlayer({ videoUrl, vttUrl }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const futureCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // const [currentTime, setCurrentTime] = useState(0);

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
    isFuture?: boolean,
  ) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    let alpha = isFuture ? 0.5 : 1;
    // 프레임 마다 호출.
    const drawFrame = () => {
      if (isFuture && alpha < 1) {
        alpha += 0.0005;
        ctx.globalAlpha = alpha;
      } else if (!isFuture && alpha > 0.5) {
        alpha -= 0.0005;
        ctx.globalAlpha = alpha;
      }
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      requestAnimationFrame(drawFrame);
    };

    requestAnimationFrame(drawFrame);
  };

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const futureCanvas = futureCanvasRef.current;

    const interval = setInterval(() => {
      if (video && canvas) {
        drawImageFromVideo(canvas, video);
      }

      if (video && futureCanvas) {
        const futureTime = video.currentTime + 5; // second
        /// 가상 비디오 만드는 파트

        if (futureTime < video.duration) {
          const tempVideo = document.createElement("video");
          tempVideo.src = videoUrl;
          tempVideo.currentTime = futureTime;
          // video 준비된 상태
          tempVideo.addEventListener("seeked", () => {
            drawImageFromVideo(futureCanvas, tempVideo, true);
          });
        }
      }
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [videoUrl]);

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
          className="absolute top-0 z-30 aspect-video w-full max-w-2xl scale-90 overflow-clip blur-3xl"
          width={320}
          height={180}
        />
        <canvas
          ref={futureCanvasRef}
          className="absolute top-0 z-30 aspect-video w-full max-w-2xl scale-90 overflow-clip blur-3xl"
          width={320}
          height={180}
        />
      </div>
    </div>
  );
}

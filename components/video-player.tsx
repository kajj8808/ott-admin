"use client";

import { useEffect, useRef, useState } from "react";

interface DrawFrameFromVideo {
  canvas: HTMLCanvasElement;
  video: HTMLVideoElement;
  mode?: "fadeOut" | "fadeIn";
  minAlpha: number;
  maxAlpha: number;
  imageUrl?: string;
  isSave?: boolean;
}

interface DrawCanvasHandler {
  canvasOne: HTMLCanvasElement;
  canvasTwo: HTMLCanvasElement;
  videoOne: HTMLVideoElement;
  videoTwo: HTMLVideoElement;
}

interface VideoPlayerProps {
  videoUrl: string;
  vttUrl: string;
}
export default function VideoPlayer({ videoUrl, vttUrl }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  /** 현재 video frame을 얻기 위해 사용. */
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  /** ~ 초후 video frame을 얻기 위해 사용. */
  const futureCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // const [currentTime, setCurrentTime] = useState(0);

  const [imageUrl, setImageUrl] = useState<string | null>();

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = 0.2;
    }
  }, []);

  const drawFrameFromVideo = ({
    canvas,
    video,
    minAlpha,
    maxAlpha,
    mode,
    imageUrl,
    isSave,
  }: DrawFrameFromVideo) => {
    const ctx = canvas.getContext("2d")!;

    const fadeIn = mode === "fadeIn";

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = maxAlpha;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const tempImageDataUrl = canvas.toDataURL();
    const tempImage = new Image();
    tempImage.crossOrigin = "anonymous";
    tempImage.src = imageUrl ? imageUrl : tempImageDataUrl;

    // 기본 투명도 fade in, out 에 변경됩니다.
    let alpha = fadeIn ? minAlpha : maxAlpha;
    const fadeSpeed = 0.001; // 투명도 변화 속도 조정

    // 프레임 마다 호출.
    const drawFrame = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = alpha;
      ctx.drawImage(tempImage, 0, 0, canvas.width, canvas.height);
      // fade in 0 -> 100 으로 투명도 올라가게.
      if (fadeIn) {
        if (alpha < maxAlpha) {
          alpha += fadeSpeed;
          ctx.globalAlpha = alpha;
          requestAnimationFrame(drawFrame);
        } else {
          // 애니메이션이 끝난 후 마지막 프레임을 state에 저장합니다.
          if (isSave) {
            setImageUrl(tempImageDataUrl);
          }
        }
      }

      // fade out 100 -> 0 으로 투명도 내려가게.
      if (!fadeIn) {
        if (alpha > minAlpha) {
          alpha -= fadeSpeed;
          ctx.globalAlpha = alpha;
          requestAnimationFrame(drawFrame);
        } else {
          // 애니메이션이 끝난 후 마지막 프레임을 state에 저장합니다.
          if (isSave) {
            setImageUrl(tempImageDataUrl);
          }
        }
      }
    };

    drawFrame();
  };
  const drawCanvasHandler = ({
    canvasOne,
    canvasTwo,
    videoOne,
    videoTwo,
  }: DrawCanvasHandler) => {
    drawFrameFromVideo({
      canvas: canvasOne,
      video: videoOne,
      mode: "fadeOut",
      maxAlpha: 0.9,
      minAlpha: 0.1,
      imageUrl: imageUrl!,
    });

    drawFrameFromVideo({
      canvas: canvasTwo,
      video: videoTwo,
      mode: "fadeIn",
      maxAlpha: 0.9,
      minAlpha: 0.1,
      isSave: true,
    });
  };

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const futureCanvas = futureCanvasRef.current;

    if (!(video && canvas && futureCanvas)) return;

    const drawCurrentAndFutureFrames = () => {
      const futureTime = video.currentTime + 5; // 5초 후 second
      /// 가상 비디오 생성
      if (futureTime < video.duration) {
        const tempVideo = document.createElement("video");
        tempVideo.crossOrigin = "anonymous";
        tempVideo.src = videoUrl;
        tempVideo.currentTime = futureTime;
        // video 준비된 상태
        tempVideo.addEventListener("seeked", () => {
          // play 중에만 작동하게 변경..
          drawCanvasHandler({
            canvasOne: canvas,
            canvasTwo: futureCanvas,
            videoOne: video,
            videoTwo: tempVideo,
          });
        });
      }
    };

    drawCurrentAndFutureFrames();
    const interval = setInterval(() => {
      drawCurrentAndFutureFrames();
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [videoUrl]);

  return (
    <div className="flex h-dvh w-full">
      <div className="relative aspect-video">
        <video
          ref={videoRef}
          autoPlay={true}
          controls
          crossOrigin="anonymous"
          defaultValue={0.2}
          preload="auto"
          className="relative top-0 z-40 aspect-video max-w-2xl rounded-xl bg-transparent"
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
        <div className="relative">
          <canvas
            ref={canvasRef}
            className="absolute top-0 z-30 aspect-video max-w-2xl scale-125 overflow-clip blur-3xl"
            width={320}
            height={180}
          />
          <canvas
            ref={futureCanvasRef}
            className="absolute top-0 z-30 aspect-video max-w-2xl scale-125 overflow-clip blur-3xl"
            width={320}
            height={180}
          />
        </div>
      </div>
    </div>
  );
}

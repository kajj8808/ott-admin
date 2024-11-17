"use client";

import { useCallback, useEffect, useRef, useState } from "react";

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

interface VideoAmbientProps {
  video: HTMLVideoElement | null;
  videoUrl: string;
}
declare global {
  interface Window {
    tempVideo?: HTMLVideoElement;
  }
}

export default function VideoAmbient({ video, videoUrl }: VideoAmbientProps) {
  /** 현재 video frame을 얻기 위해 사용. */
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  /** ~ 초후 video frame을 얻기 위해 사용. */
  const futureCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // 이미지 간의 부드러운 전환을 위해서 이전의 image를 보관합니다.
  const [imageUrl, setImageUrl] = useState<string | null>();
  /*   const [isAnimating, setIsAnimating] = useState(false);
   */

  const drawCanvasHandler = useCallback(
    ({ canvasOne, canvasTwo, videoOne, videoTwo }: DrawCanvasHandler) => {
      drawFrameFromVideo({
        canvas: canvasOne,
        video: videoOne,
        mode: "fadeOut",
        maxAlpha: 0.9,
        minAlpha: 0,
        imageUrl: imageUrl!,
      });

      drawFrameFromVideo({
        canvas: canvasTwo,
        video: videoTwo,
        mode: "fadeIn",
        maxAlpha: 0.9,
        minAlpha: 0,
        isSave: true,
      });
    },
    [imageUrl],
  );

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

  useEffect(() => {
    const canvas = canvasRef.current;
    const futureCanvas = futureCanvasRef.current;

    if (!(video && canvas && futureCanvas)) return;

    const handleSeeked = () => {
      // play 중에만 작동하게 변경..
      drawCanvasHandler({
        canvasOne: canvas,
        canvasTwo: futureCanvas,
        videoOne: video,
        videoTwo: window.tempVideo!,
      });
    };

    const drawCurrentAndFutureFrames = () => {
      const futureTime = video.currentTime + 5; // 5초 후 second
      /// 가상 비디오 생성
      if (futureTime < video.duration) {
        if (!window.tempVideo) {
          const tempVideo = document.createElement("video");
          tempVideo.crossOrigin = "anonymous";
          tempVideo.src = videoUrl;
          window.tempVideo = tempVideo;
        }
        window.tempVideo.currentTime = futureTime;

        // video 준비된 상태
        window.tempVideo.addEventListener("seeked", handleSeeked);
      }
    };

    drawCurrentAndFutureFrames();

    // 초기에 video가 로딩 되어 있지 않은 상태에서 함수를 실행하기 위해 사용.
    video.addEventListener("loadedmetadata", drawCurrentAndFutureFrames);

    return () => {
      video.removeEventListener("loadedmetadata", drawCurrentAndFutureFrames);
    };
  }, [video, videoUrl, imageUrl, drawCanvasHandler]);

  return (
    <div className="relative size-full animate-fade blur-3xl">
      <canvas
        ref={canvasRef}
        className="absolute top-0 z-30 aspect-video w-full scale-125 overflow-clip blur-3xl"
        width={160}
        height={90}
      />
      <canvas
        ref={futureCanvasRef}
        className="absolute top-0 z-30 aspect-video w-full scale-125 overflow-clip blur-3xl"
        width={160}
        height={90}
      />
    </div>
  );
}

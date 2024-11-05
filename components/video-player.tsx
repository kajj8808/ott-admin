"use client";

import { useEffect, useRef, useState } from "react";
import VideoAmbient from "./video-ambient";

interface VideoPlayerProps {
  videoUrl: string;
  vttUrl: string;
}
export default function VideoPlayer({ videoUrl, vttUrl }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isVideoReady, setIsVideoReady] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = 0.2;
      setIsVideoReady(true);
    }
  }, []);
  console.log(videoRef.current);
  return (
    <div className="flex h-dvh w-full items-center justify-center overflow-hidden">
      <div className="relative aspect-video">
        <video
          ref={videoRef}
          autoPlay={true}
          controls
          crossOrigin="anonymous"
          defaultValue={0.2}
          preload="auto"
          className="relative top-0 z-40 aspect-video bg-transparent"
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
        {isVideoReady && (
          <div className="absolute left-0 top-0 aspect-video size-full">
            <VideoAmbient video={videoRef.current} videoUrl={videoUrl} />
          </div>
        )}
      </div>
    </div>
  );
}

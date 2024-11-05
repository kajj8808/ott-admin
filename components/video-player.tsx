"use client";

import { useEffect, useRef } from "react";
import VideoAmbient from "./video-ambient";

interface VideoPlayerProps {
  videoUrl: string;
  vttUrl: string;
}
export default function VideoPlayer({ videoUrl, vttUrl }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = 0.2;
    }
  }, []);

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
        <VideoAmbient video={videoRef.current} videoUrl={videoUrl} />
      </div>
    </div>
  );
}

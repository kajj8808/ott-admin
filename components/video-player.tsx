"use client";

import { useEffect, useRef } from "react";

interface VideoPlayerProps {
  videoUrl: string;
  trackUrl?: string | null | undefined;
  trackLabel?: string;
}
export default function VideoPlayer({
  videoUrl,
  trackUrl,
  trackLabel,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = 0.2;
      // 비디오 시간 이동 (초)
      // videoRef.current.currentTime = 30;
    }
  }, [videoRef]);
  return (
    <video controls crossOrigin="anonymous" ref={videoRef}>
      <source src={videoUrl} type="video/mp4" />
      {trackUrl ? (
        <track
          src={trackUrl}
          kind="subtitles"
          srcLang="kr"
          label={trackLabel ? trackLabel : "한국어"}
          default
        />
      ) : null}
    </video>
  );
}

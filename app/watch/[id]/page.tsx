"use client";

import { Episode } from "@prisma/client";
import { Variants, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function WatchPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const [episode, setEpisode] = useState<Episode>();
  const router = useRouter();
  const icon: Variants = {
    hidden: {
      pathLength: 0,
    },
    visible: {
      pathLength: 1,
      transition: { duration: 3 },
    },
  };
  const goBack = () => {
    router.back();
  };
  useEffect(() => {
    fetch(`${window.origin}/api/episode/${id}`)
      .then((res) => res.json())
      .then((json) => setEpisode(json.episode));
  }, [id]);
  return (
    <div className="relative w-full h-full bg-product-background">
      <div
        className="absolute z-50 rounded-full cursor-pointer top-10 left-10 size-11 backdrop-blur-md"
        onClick={goBack}
      >
        <svg
          data-slot="icon"
          fill="none"
          strokeWidth="1.5"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <motion.path
            variants={icon}
            initial="hidden"
            animate="visible"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          ></motion.path>
        </svg>
      </div>

      {episode ? (
        <video
          controls
          className="w-full h-screen"
          autoPlay
          crossOrigin="anonymous"
        >
          <source src={`/video/${episode.videoId}`} type="video/mp4" />
          <track
            kind="subtitles"
            srcLang="kr"
            label="English"
            src={`/subtitle/${episode.vttId}`}
            default
          ></track>
        </video>
      ) : null}
    </div>
  );
}

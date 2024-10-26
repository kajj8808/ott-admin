"use client";
import { getAverageColor } from "@/lib/utile";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { CSSProperties, useState } from "react";

interface SeriesItemProps {
  id: number;
  coverImage: string;
  title: string;
  overview: string;
}

export default function SeriesItem({
  id,
  coverImage,
  title,
  overview,
}: SeriesItemProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [averageColor, setAverageColor] = useState({ r: 0, g: 0, b: 0 });
  const [darkText, setDarkText] = useState(false);

  const onLoadingComplete = (img: HTMLImageElement) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = img.width;
    canvas.height = img.height;

    ctx?.drawImage(img, 0, 0);
    const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height).data;
    if (imageData) {
      const averageColor = getAverageColor(imageData);
      if (averageColor.r + averageColor.g + averageColor.b > 600) {
        setDarkText(true);
      }
      setAverageColor(averageColor);
      setIsLoading(false);
    }
  };

  return (
    <Link
      href={`/series/${id}`}
      className="group relative overflow-hidden rounded-lg"
    >
      <Image
        src={coverImage}
        alt={title}
        width={341}
        height={192}
        className="pointer-events-none transition group-hover:scale-125"
        onLoadingComplete={onLoadingComplete}
      />
      <div
        className={`absolute bottom-0 z-40 p-4 ${darkText ? "*:text-neutral-800" : "*:text-white"} `}
      >
        <h4 className="line-clamp-1 text-sm font-semibold">{title}</h4>
        <span className="line-clamp-1 text-xs">{overview}</span>
      </div>
      <div
        className={`absolute left-0 top-0 z-30 h-full w-full bg-gradient-to-b from-transparent via-transparent`}
        style={
          {
            "--tw-gradient-to": `rgb(${averageColor.r},${averageColor.g},${averageColor.b})`,
          } as CSSProperties
        }
      ></div>

      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            className="absolute left-0 top-0 z-50 size-full animate-pulse bg-neutral-800"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        ) : null}
      </AnimatePresence>
      {/* <h5>{series.overview}</h5> */}
    </Link>
  );
}

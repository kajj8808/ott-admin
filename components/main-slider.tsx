"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface SeriesItemProps {
  id: number;
  cover_image: string | null;
  title: string;
  overview: string;
}
export default function MainSlider({ series }: { series: SeriesItemProps[] }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (canvasRef.current && imageRef.current) {
      const image = imageRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      if (!ctx) return console.error("ctx error");

      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    }
  }, []);

  return (
    <div className="relative aspect-video w-full">
      <Image
        src={series[0].cover_image!}
        alt={series[0].title}
        width={341}
        height={192}
        className="pointer-events-none w-full rounded-2xl border border-b-transparent border-r-transparent"
        ref={imageRef}
      />
      <div className="absolute bottom-0 left-0 right-0 top-0 -z-20 m-auto w-full">
        <canvas
          ref={canvasRef}
          width={341}
          height={192}
          className="w-full scale-150 blur-3xl"
        />
      </div>

      {/* {series.map((item) => (
        <div key={item.id}></div>
      ))} */}
    </div>
  );
}

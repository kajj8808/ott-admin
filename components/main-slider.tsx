"use client";

import { formatToTimeAgo } from "@/lib/utile";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface SeriesItemProps {
  id: number;
  cover_image: string | null;
  title: string;
  overview: string;
  update_at: Date;
}
export default function MainSlider({ series }: { series: SeriesItemProps[] }) {
  const navigation = useRouter();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (canvasRef.current && imageRef.current) {
      const image = imageRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      if (!ctx) return console.error("ctx error");

      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    }
  }, [imageLoaded]);

  const seriesClickHandler = (seriesId: number) => {
    navigation.push(`/series/${seriesId}`);
  };

  return (
    <div className="aspect-main-slider relative w-full">
      <div
        className="aspect-main-slider group relative cursor-pointer rounded-2xl bg-gradient-to-br p-1 drop-shadow-2xl dark:from-white dark:via-transparent dark:to-transparent"
        onClick={() => seriesClickHandler(series[0].id)}
      >
        <div className="main-slider-gradient-curve pointer-events-none size-full rounded-2xl">
          <Image
            src={series[0].cover_image!}
            alt={series[0].title}
            className="main-slider-image-gradient transform-gpu object-cover object-center transition-all group-hover:scale-105"
            ref={imageRef}
            fill
            onLoad={() => setImageLoaded(true)}
          />
          <div className="absolute flex size-full flex-col justify-end gap-1 rounded-2xl bg-gradient-to-b from-transparent via-transparent to-[rgba(0,0,0,0.5)] px-10 py-10 drop-shadow-2xl sm:pb-16 md:px-20 lg:pb-24 xl:pb-32">
            <div>
              <h1 className="line-clamp-2 w-1/2 text-pretty text-xl font-semibold sm:text-2xl md:text-5xl">
                {series[0].title}
              </h1>
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-semibold">{`${formatToTimeAgo(series[0].update_at.toString())} 업데이트`}</p>
              <span className="line-clamp-2 text-xs font-medium text-neutral-300 md:text-sm xl:w-11/12">
                {series[0].overview}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 top-0 -z-20 m-auto w-full">
        <canvas
          ref={canvasRef}
          width={341}
          height={192}
          className="w-full scale-200 transform-gpu blur-3xl"
        />
      </div>
    </div>
  );
}

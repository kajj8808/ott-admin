"use client";

import { getAverageColor } from "@/lib/utile";
import Image from "next/image";
import { CSSProperties, useEffect, useRef, useState } from "react";

interface SeriesItemProps {
  id: number;
  cover_image: string | null;
  title: string;
  overview: string;
}
export default function MainSlider({ series }: { series: SeriesItemProps[] }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const [imageLoaded, setImageLoaded] = useState(false);
  const [bgColor, setBgColor] = useState({ r: 0, g: 0, b: 0 });

  useEffect(() => {
    if (canvasRef.current && imageRef.current) {
      const image = imageRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      if (!ctx) return console.error("ctx error");

      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      const imageData = ctx.getImageData(
        0,
        0,
        canvas.width,
        canvas.height,
      ).data;
      const rgbColor = getAverageColor(imageData);
      setBgColor({ r: rgbColor.r, g: rgbColor.g, b: rgbColor.b });
    }
  }, [imageLoaded]);

  return (
    <div className="relative aspect-video w-full">
      <Image
        src={series[0].cover_image!}
        alt={series[0].title}
        className="clip-bottom-curve pointer-events-none rounded-2xl bg-gradient-to-br p-1 dark:from-white dark:via-transparent dark:to-transparent"
        ref={imageRef}
        fill
        onLoad={() => setImageLoaded(true)}
      />
      <div className="absolute bottom-0 left-0 right-0 top-0 -z-20 m-auto w-full">
        <canvas
          ref={canvasRef}
          width={341}
          height={192}
          className="w-full scale-150 blur-3xl"
        />
      </div>
      <div
        className="clip-bottom-curve absolute z-40 box-border flex flex-col justify-between rounded-2xl bg-gradient-to-b from-[rgba(0,0,0,0.3)] via-transparent to-[rgba(0,0,0,0.3)] p-16"
        /* style={
          {
            "--tw-gradient-to": `rgba(${bgColor.r},${bgColor.g},${bgColor.b},0.5)`,
          } as CSSProperties
        } */
      >
        <div>
          <h1 className="text-2xl font-semibold">{series[0].title}</h1>
        </div>
        <div>
          <span>{series[0].overview}</span>
        </div>
      </div>
      {/* {series.map((item) => (
        <div key={item.id}></div>
      ))} */}
    </div>
  );
}

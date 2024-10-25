"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { Series } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Slider({ series }: { series: Series[] }) {
  const [page, setPage] = useState(0);
  const onNextClick = () => {
    setPage((prev) => prev + 1);
  };
  const onPrevClick = () => {
    setPage((prev) => prev - 1);
  };
  return (
    <div className="relative flex w-full items-center justify-between px-[4%]">
      <div
        className="absolute left-0 top-0 z-30 flex h-full w-[4%] items-center justify-center rounded-r-md bg-neutral-800 bg-opacity-50"
        onClick={onPrevClick}
      >
        <ChevronLeftIcon className="size-8" />
      </div>
      <div
        className="relative left-[-0%] flex overflow-visible transition-all"
        style={{
          left: `-${page * 100}%`,
        }}
      >
        {series.map((series) => (
          <Link
            href={`/series/${series.id}`}
            key={series.id}
            className="flex min-w-[25%] items-center justify-center overflow-hidden rounded-md px-0.5 text-black"
          >
            <Image
              src={series.cover_image}
              alt={series.title}
              width={341}
              height={192}
              className="pointer-events-none"
            />
            {series.logo}
          </Link>
        ))}
      </div>
      <div
        className="absolute right-0 top-0 z-30 flex h-full w-[4%] items-center justify-center rounded-l-md bg-neutral-800 bg-opacity-50"
        onClick={onNextClick}
      >
        <ChevronRightIcon className="size-8" />
      </div>
    </div>
  );
}

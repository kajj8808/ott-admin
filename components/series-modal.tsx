"use client";
import { convertSharedUrlToHostedImageUrl } from "@/app/lib/client/utile";
import { Episode, Season } from "@prisma/client";
import { Variants, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
interface SeriesModalProps {
  seriesId: string;
  coverImage: string;
  logo: string;
  seasons: { id: number; name: string }[];
}
export default function SeriesModal({
  seriesId,
  coverImage,
  logo,
  seasons,
}: SeriesModalProps) {
  const router = useRouter();
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [currentSeason, setCurrentSeason] = useState(seasons[0]);
  const goBack = () => {
    router.back();
  };
  const icon: Variants = {
    hidden: {
      pathLength: 0,
    },
    visible: {
      pathLength: 1,
      transition: { duration: 3 },
    },
  };
  useEffect(() => {
    fetch(`${window.location.origin}/api/season/${currentSeason?.id}/episode`)
      .then((res) => res.json())
      .then((json) => setEpisodes(json.episodes));
  }, [currentSeason]);
  console.log(episodes);
  return (
    <div>
      <motion.div
        layoutId={seriesId}
        initial={{ opacity: 0.2 }}
        animate={{ opacity: 1 }}
        transition={{
          opacity: { ease: "linear" },
          layout: { duration: 0.3 },
        }}
        className="absolute left-0 right-0 z-50 w-full max-w-md mx-auto overflow-auto shadow-xl rounded-t-2xl sm:max-w-lg md:max-w-xl lg:max-w-4xl xl:max-w-6xl bg-product-background top-5 h-[calc(100%-20px)] scrollbar-hide"
      >
        <div className="relative">
          <Image src={coverImage} width={1200} height={1200} alt="string" />
          <div className="absolute top-0 z-10 w-full h-full from-transparent via-transparent to-product-background bg-gradient-to-b from-0% via-50% to-100%"></div>
          <div className="absolute bottom-0 z-20 w-1/2 p-8 lg:w-full lg:bottom-16">
            {logo ? (
              <Image
                src={convertSharedUrlToHostedImageUrl(logo)}
                alt="logo"
                width={360}
                height={360}
                className=""
              />
            ) : null}
          </div>
          <div
            className="absolute z-50 p-1 rounded-full cursor-pointer top-5 right-5 size-8 sm:size-10 bg-product-background"
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
                d="M6 18 18 6M6 6l12 12"
              ></motion.path>
            </svg>
          </div>
        </div>
        <div className="px-5">
          <div className="flex justify-between p-3 mt-5">
            <h3 className="text-xl font-semibold">회차</h3>
            <h3 className="text-lg">
              {seasons.length > 0 ? seasons[0].name : null}
            </h3>
          </div>
          <div className="flex flex-col">
            {episodes.map((episode) => (
              <Link
                href={`/watch/${episode.videoId}`}
                key={episode.id}
                className="mx-5 mb-3 border-b rounded-md cursor-pointer border-product-color border-opacity-30"
              >
                <div className="grid grid-cols-12 gap-2 py-5">
                  <h3 className="flex items-center justify-center col-span-1 text-lg">
                    {episode.number}
                  </h3>
                  <div className="col-span-3 overflow-hidden rounded-lg">
                    <Image
                      src={episode.thumnail}
                      alt="post_image"
                      width={400}
                      height={400}
                    />
                  </div>
                  <div className="flex flex-col justify-center col-span-8">
                    <div className="flex justify-between">
                      <h4 className="text-xs font-bold text-product-color lg:text-base line-clamp-1">
                        {episode.title}
                      </h4>
                      <h5 className="text-xs font-bold text-product-color lg:text-base">
                        {episode.runningTime}m
                      </h5>
                    </div>
                    <h5 className="mt-1 text-xs sm:mt-2 md:mt-4 line-clamp-1 sm:line-clamp-2 text-product-color lg:text-sm">
                      {episode.description}
                    </h5>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </motion.div>
      <div
        className="absolute top-0 left-0 z-40 w-full h-full bg-black bg-opacity-30 backdrop-blur-md"
        onClick={goBack}
      ></div>
    </div>
  );
}

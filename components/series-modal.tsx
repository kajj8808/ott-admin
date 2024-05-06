"use client";
import { convertSharedUrlToHostedImageUrl } from "@/app/lib/client/utile";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
interface SeriesModalProps {
  seriesId: string;
  coverImage: string;
  logo: string;
}
export default function SeriesModal({
  seriesId,
  coverImage,
  logo,
}: SeriesModalProps) {
  const router = useRouter();
  const onBackDropClick = () => {
    router.back();
  };
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
            <Image
              src={convertSharedUrlToHostedImageUrl(logo)}
              alt="logo"
              width={360}
              height={360}
              className=""
            />
          </div>
        </div>
        <div className="px-5">
          <div className="flex justify-between p-3 mt-5">
            <h3 className="text-xl font-semibold">회차</h3>
            <h3 className="text-lg">시즌 1</h3>
          </div>
          {[1, 2, 3, 4, 5].map((item) => (
            <div
              key={item}
              className="mx-5 mb-3 border-b rounded-md border-product-color border-opacity-30"
            >
              <div className="grid grid-cols-12 gap-2 py-5">
                <h3 className="flex items-center justify-center col-span-1 text-lg">
                  1
                </h3>
                <div className="col-span-3 overflow-hidden rounded-lg">
                  <Image
                    src={
                      "https://media.themoviedb.org/t/p/original/ygmEcErrtQ9HgSX6Nooe9csAyTv.jpg"
                    }
                    alt="post_image"
                    width={400}
                    height={400}
                  />
                </div>
                <div className="flex flex-col justify-center col-span-8">
                  <div className="flex justify-between">
                    <h4 className="text-xs font-bold text-product-color lg:text-base line-clamp-1">
                      아비도스 고등학교 폐교 대책위원회
                    </h4>
                    <h5 className="text-xs font-bold text-product-color lg:text-base">
                      24m
                    </h5>
                  </div>
                  <h5 className="mt-1 text-xs sm:mt-2 md:mt-4 line-clamp-1 sm:line-clamp-2 text-product-color lg:text-sm">
                    재정 문제로 폐쇄 직전에 있는 아비도스 고등학교. 그리고
                    학교를 살리기 위해 고군분투하는 대책위원회가 있다.
                    대책위원회의 위원장인 호시노를 비롯한 아이들은 오늘도 학교를
                    살리기 위한 회의를 시작한다. 그리고 그들 앞에 갑자기
                    선생님이 나타나는데....
                  </h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
      <div
        className="absolute top-0 left-0 z-40 w-full h-full bg-black bg-opacity-30 backdrop-blur-md"
        onClick={onBackDropClick}
      ></div>
    </div>
  );
}

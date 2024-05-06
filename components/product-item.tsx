"use client";
import { convertSharedUrlToHostedImageUrl } from "@/app/lib/client/utile";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface productItemProps {
  id: number;
  coverImage: string;
  logo: string;
}

export default function ProductItem({
  id,
  coverImage,
  logo,
}: productItemProps) {
  return (
    <motion.div
      layoutId={id.toString()}
      className="relative z-30 overflow-hidden border shadow-lg rounded-xl group"
    >
      <Link href={`/series/${id}`}>
        <Image
          src={coverImage}
          alt="cover-image"
          width={300}
          height={300}
          className="w-full transition-all duration-500 group-hover:scale-125"
        />
        <div className="absolute top-0 z-10 w-full h-full from-transparent via-transparent to-product-background bg-gradient-to-b from-0% via-50% to-100%"></div>
        <div className="absolute bottom-0 z-20 w-full p-3.5">
          <Image
            src={convertSharedUrlToHostedImageUrl(logo)}
            alt="logo"
            width={120}
            height={120}
            className=""
          />
        </div>
      </Link>
    </motion.div>
  );
}

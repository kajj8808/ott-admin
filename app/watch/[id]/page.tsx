"use client";

import { Variants, motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function WatchPage() {
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
  return (
    <div className="relative w-full h-screen bg-product-background">
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

      <video
        src="http://kajj8808.store:8000/video/1715434639184"
        controls
        className="w-full h-screen"
        autoPlay
      ></video>
    </div>
  );
}

"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const rowVariants = {
  hidden: { x: window.outerWidth + 10 },
  visible: { x: 0 },
  exit: { x: -window.outerWidth - 10 },
};

const offset = 6;

export default function Slider() {
  const [index, setIndex] = useState(0);
  const next = () => {
    if (leaving) return;
    toggleLeaving();
    const totalItems = 18;
    const maxIndex = Math.ceil(totalItems / offset);

    setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  };
  const prev = () => setIndex((prev) => prev - 1);

  const [leaving, setLeaving] = useState(false);
  const toggleLeaving = () => setLeaving((prev) => !prev);

  return (
    <div>
      <div className="flex justify-center gap-5">
        <button onClick={prev}>prev</button>
        <button onClick={next}>next</button>
      </div>
      <div className="relative">
        <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
          <motion.div
            className="absolute mb-5 grid w-full grid-cols-6 gap-1"
            key={index}
            variants={rowVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{
              ease: "linear",
            }}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
              .slice(offset * index, offset * index + offset)
              .map((i) => (
                <motion.div
                  key={i}
                  /*      variants={boxVariants}
                initial={"invisible"}
                animate={"visible"}
                exit={"exit"} */
                  className="flex h-36 items-center justify-center rounded-xl bg-white text-xl font-medium text-neutral-600"
                >
                  {i}
                </motion.div>
              ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

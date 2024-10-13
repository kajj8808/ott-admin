"use client";

import {
  AnimatePresence,
  motion,
  PanInfo,
  useDragControls,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
interface ProductSliderProps {
  items: {
    id: number;
    title: string;
    cover_image: string;
  }[];
}

export default function ProductSlider({ items }: ProductSliderProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const boxRef = useRef<HTMLDivElement | null>(null);

  const [offset, setOffset] = useState(1); // 한번에 표시될 item의 갯수
  const [prevItemCount, setPrevItemCount] = useState(0); // 현재 왼쪽으로 밀려난 아이템의 갯수.

  // 페이지 layout에 관련된 state ( offset 구하기, prev next button 크기 조정 등. )
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    const pageResizeHandler = () => {
      console.log(boxRef.current);
      if (containerRef.current && boxRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const boxWidth = boxRef.current.offsetWidth;
        console.log(containerWidth, boxWidth);
        setOffset(Math.floor(containerWidth / boxWidth));

        setPageLoading(false);
      }
    };

    window.addEventListener("resize", pageResizeHandler);
    pageResizeHandler();

    return () => {
      window.removeEventListener("resize", pageResizeHandler);
    };
  }, []);

  const onDragEndHandler = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    if (info.offset.x < -50) {
      if (prevItemCount + offset >= items.length) {
        return setPrevItemCount(0);
      }
      setPrevItemCount((prevCount) => prevCount + offset);
    }
    if (info.offset.x > 50) {
      if (prevItemCount - offset < 0) {
        return setPrevItemCount(items.length - offset);
      }
      setPrevItemCount((prevCount) => prevCount - offset);
    }
  };
  console.log(offset);
  return (
    <div className="relative">
      <AnimatePresence>
        <motion.div
          className="absolute grid w-full grid-cols-3 gap-1 md:grid-cols-6"
          ref={containerRef}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={onDragEndHandler}
          transition={{
            ease: "linear",
          }}
        >
          {items.slice(prevItemCount, prevItemCount + offset).map((item) => (
            <motion.div
              key={item.id}
              ref={(element) => {
                // 있을 경우에도 넣을시 나중에 item이 사라졌을 경우 null을 반환하는 경우가 있음.
                if (!boxRef.current) {
                  boxRef.current = element;
                }
              }}
              className="relative aspect-video overflow-hidden rounded-sm"
            >
              <Image
                src={item.cover_image}
                alt={item.title}
                width={342}
                height={192}
                className="pointer-events-none"
              />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
      {pageLoading ? (
        <div className="absolute left-0 top-0 grid w-full grid-cols-3 gap-1 bg-neutral-800 md:grid-cols-6">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="aspect-video w-full animate-pulse rounded-sm bg-neutral-600"
            ></div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

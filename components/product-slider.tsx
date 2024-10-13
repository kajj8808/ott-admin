"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

interface ProductSliderProps {
  items: {
    id: number;
    title: string;
    cover_image: string;
  }[];
}
export default function ProductSlider({ items }: ProductSliderProps) {
  const navigation = useRouter();

  const containerRef = useRef<HTMLDivElement | null>(null);
  const boxRef = useRef<HTMLDivElement | null>(null);

  const [offset, setOffset] = useState(0); // 한번에 표시될 item의 갯수
  const [itemCount, setItemCount] = useState(0); // 현재 왼쪽으로 밀려난 아이템의 갯수.
  const [boxWidth, setBoxWidth] = useState(0);
  const [gapPaddingSize, setGapPaddingSize] = useState(0);

  useEffect(() => {
    if (containerRef.current && boxRef.current) {
      setOffset(
        Math.floor(
          containerRef.current.offsetWidth / boxRef.current.offsetWidth,
        ),
      );
      const boxStyle = window.getComputedStyle(boxRef.current);

      setGapPaddingSize(parseFloat(boxStyle.paddingInline));
      setBoxWidth(boxRef.current.offsetWidth);
    }
  }, []);

  const prev = () => {
    setItemCount((prev) => prev - offset);
  };
  const next = () => {
    setItemCount((prev) => prev + offset);
  };

  return (
    <div className="relative">
      <motion.div
        ref={containerRef}
        className="relative z-40 flex w-full overflow-visible px-[4%] transition-all"
        style={{
          left: `-${itemCount * boxWidth - gapPaddingSize < 0 ? 0 : itemCount * boxWidth - gapPaddingSize}px`,
        }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={(event, info) => {
          if (info.offset.x < -50) {
            next();
          }
          if (info.offset.x > 50) {
            prev();
          }
        }}
        transition={{
          ease: "linear",
        }}
      >
        {items.map((item) => (
          <div
            ref={boxRef}
            key={item.id}
            className="w-1/5 flex-shrink-0 cursor-pointer px-[0.2vw]"
            onClick={() => {
              navigation.push(`/series/${item.id}`);
            }}
          >
            <Image
              src={item.cover_image}
              alt={item.title}
              width={342}
              height={192}
              className="pointer-events-none"
            />
          </div>
        ))}
      </motion.div>
      <div className="absolute left-0 top-0 h-full w-full">
        <button
          onClick={prev}
          className="absolute left-0 z-50 flex h-full w-[4%] items-center justify-center rounded-r-sm bg-black bg-opacity-65"
        >
          Prev
        </button>
        <button
          onClick={next}
          className="absolute right-0 z-50 flex h-full w-[4%] items-center justify-center rounded-l-sm bg-black bg-opacity-65"
        >
          Next
        </button>
      </div>
    </div>
  );
}

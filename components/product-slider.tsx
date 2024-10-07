"use client";

import { Series } from "@/app/(tabs)/(home)/actions";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";

interface ProductSliderProps {
  series: Series[];
}

export default function ProductSlider({ series }: ProductSliderProps) {
  const sliderContainer = useRef<HTMLDivElement>(null);
  const sliderItemBox = useRef<HTMLAnchorElement>(null);

  const [sliderMaxLenth, setSliderMaxLength] = useState(0);
  const [sliderIndex, setSliderIndex] = useState(0);

  const [isLeftBtnShow, setIsLeftBtnShow] = useState(true);
  const [isRigthBtnShow, setIsRigthBtnShow] = useState(true);

  const [sliderItemBoxWidth, setSliderItemBoxWidth] = useState(0);

  const [itemPaddingLeft, setItemPaddingLeft] = useState(0);
  const [itemPaddingRight, setItemPaddingRight] = useState(0);

  useEffect(() => {
    updateSliderMaxLenth();
    window.addEventListener("resize", updateSliderMaxLenth);
    return () => {
      window.removeEventListener("resize", updateSliderMaxLenth);
    };
  }, [sliderContainer, sliderItemBox]);

  useEffect(() => {
    /** 슬라이드 작동
     * 1. 슬라이드 시작 index가 0 이상일 때 슬라이드 왼쪽 버튼 활성화.
     * 2. 슬라이드 마지막 index일 경우 슬라이드 오른쪽 버튼 활성화.(마지막 인덱스 기준 -> 총 슬라이드 아이템 갯수 - 화면에 보이는 슬라이드 아이템 갯수.)
     */
    setIsLeftBtnShow(sliderIndex !== 0);
    updateSliderItemSize();
    window.addEventListener("resize", updateSliderItemSize);
    return () => {
      window.removeEventListener("resize", updateSliderItemSize);
    };
  }, [sliderIndex]);

  const updateSliderItemSize = () => {
    if (sliderItemBox.current) {
      const sliderItemBoxWidth =
        sliderItemBox.current.getBoundingClientRect().width;
      setSliderItemBoxWidth(sliderItemBoxWidth);
    }
  };

  useEffect(() => {
    // series의 갯수가 화면에 보이는 슬라이드 아이템보다 적다면 표시 x
    const seriesLength =
      sliderContainer.current?.querySelectorAll(".series").length;
    if (series.length > sliderMaxLenth) {
      setIsRigthBtnShow(true);
    }
  }, [sliderMaxLenth, series]);

  useEffect(() => {
    updatePaddingWidth();
    window.addEventListener("resize", updatePaddingWidth);
    return () => {
      window.removeEventListener("resize", updatePaddingWidth);
    };
  }, [sliderItemBox]);

  const updatePaddingWidth = () => {
    const boxStyle = window.getComputedStyle(sliderItemBox.current!);
    const paddingLeft = parseFloat(boxStyle.paddingLeft);
    const paddingRight = parseFloat(boxStyle.paddingRight);

    setItemPaddingLeft(paddingLeft);
    setItemPaddingRight(paddingRight);
  };

  const updateSliderMaxLenth = () => {
    if (sliderContainer.current && sliderItemBox.current) {
      const sliderContainerWidth = sliderContainer.current.offsetWidth;
      const sliderItemBoxWidth = sliderItemBox.current.offsetWidth;
      setSliderMaxLength(Math.floor(sliderContainerWidth / sliderItemBoxWidth));
    }
  };

  const onLeftClick = () => {
    setSliderIndex((prev) => prev - 1);
  };

  const onRigthClick = () => {
    setSliderIndex((prev) => prev + 1);
  };

  return (
    <div className="relative flex">
      {isLeftBtnShow ? (
        <button
          className="absolute z-40 col-span-1 flex h-full w-[4%] items-center justify-center rounded-r-sm bg-black bg-opacity-80 text-white transition-all"
          style={{
            width: `calc(4% - ${itemPaddingLeft}px)`,
          }}
          onClick={onLeftClick}
        >
          <div className="size-5">
            <ChevronLeftIcon />
          </div>
        </button>
      ) : null}
      <div
        className="relative col-span-10 flex px-[4%] transition-all"
        ref={sliderContainer}
        style={{
          left: -(sliderIndex * sliderItemBoxWidth),
        }}
      >
        {series.map((series) => (
          <Link
            href={`/series/${series.id}`}
            key={series.id}
            ref={sliderItemBox}
            className="min-w-[50%] px-1 min-[490px]:min-w-[33.333333%] sm:min-w-[33.333333%] md:min-w-[25%] lg:min-w-[20%]"
          >
            <div className="overflow-hidden rounded-sm">
              <Image
                src={series.cover_image}
                alt={series.title}
                width={680}
                height={320}
                className="object-cover"
              />
            </div>
          </Link>
        ))}
      </div>
      {isRigthBtnShow ? (
        <button
          className="absolute right-0 z-40 col-span-1 flex h-full items-center justify-center rounded-l-sm bg-black bg-opacity-80 text-white transition-all"
          style={{
            width: `calc(4% - ${itemPaddingRight}px)`,
          }}
          onClick={onRigthClick}
        >
          <div className="size-5">
            <ChevronRightIcon />
          </div>
        </button>
      ) : null}
    </div>
  );
}

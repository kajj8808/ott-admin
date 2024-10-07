"use client";

import { Series } from "@/app/(tabs)/(home)/actions";
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

  useEffect(() => {
    if (sliderContainer.current && sliderItemBox.current) {
      const sliderContainerWidth = sliderContainer.current.offsetWidth;
      const sliderItemBoxWidth = sliderItemBox.current.offsetWidth;
      setSliderMaxLength(Math.floor(sliderContainerWidth / sliderItemBoxWidth));
    }
  }, [sliderContainer, sliderItemBox]);

  useEffect(() => {
    /** 슬라이드 작동
     * 1. 슬라이드 시작 index가 0 이상일 때 슬라이드 왼쪽 버튼 활성화.
     * 2. 슬라이드 마지막 index일 경우 슬라이드 오른쪽 버튼 활성화.(마지막 인덱스 기준 -> 총 슬라이드 아이템 갯수 - 화면에 보이는 슬라이드 아이템 갯수.)
     */
    setIsLeftBtnShow(sliderIndex !== 0);
    // setIsRigthBtnShow
    if (sliderContainer.current && sliderItemBox.current) {
      const sliderItemBoxWidth = sliderItemBox.current.offsetWidth;
      /* const gap = sliderIndex * 8 */
      sliderContainer.current.style.left = `-${
        sliderIndex * sliderItemBoxWidth
      }px`;
    }
  }, [sliderIndex]);

  useEffect(() => {
    // series의 갯수가 화면에 보이는 슬라이드 아이템보다 적다면 표시 x
    const seriesLength =
      sliderContainer.current?.querySelectorAll(".series").length;
    if (series.length > sliderMaxLenth) {
      setIsRigthBtnShow(true);
    }
  }, [sliderMaxLenth, series]);

  const onLeftClick = () => {
    setSliderIndex((prev) => prev - 1);
  };

  const onRigthClick = () => {
    setSliderIndex((prev) => prev + 1);
  };

  return (
    <div className="flex">
      {isLeftBtnShow ? (
        <button
          className="text-white bg-black min-w-[4%] bg-opacity-80 h-full z-40 col-span-1"
          onClick={onLeftClick}
        >
          left
        </button>
      ) : null}
      <div
        className="flex relative transition-all col-span-10"
        ref={sliderContainer}
      >
        {series.map((series) => (
          <Link
            href={`/series/${series.id}`}
            key={series.id}
            ref={sliderItemBox}
            className="min-w-[20%] pr-2"
          >
            <div className="overflow-hidden rounded-md">
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
          className="text-white bg-black bg-opacity-80 h-full z-40 col-span-1 min-w-[4%]"
          onClick={onRigthClick}
        >
          rigth
        </button>
      ) : null}
    </div>
  );
}

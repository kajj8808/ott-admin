"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface SeriesItemProps {
  id: number;
  poster: string | null;
  title: string;
}
export default function PosterSlider({
  series,
  isMovie,
}: {
  series: SeriesItemProps[];
  isMovie?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [page, setPage] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  // 한번에 보이는 아이템의 갯수를 지정해두고 -> 20% -> 5개
  // 17 / 5 => 이런식으로 화면에 표시되야 되는 최대 움직임을 계산해서
  // page를 0.5 이런식으로 계산. 만약 20 퍼라면 1.2 -> 한페이지 하고도 하나를 더 움직임.

  // TODO: 무한 스크롤로 수정 해보기. => 오른쪽 클릭 했을때. (움직 였을때) => 가장 왼쪽 item, 오른쪽 item을 각각 마지막과 첫번째에 넣어주면 될듯함.

  useEffect(() => {
    const handleResize = () => {
      const container = containerRef.current;
      if (container) {
        setContainerWidth(container.offsetWidth);
      }
    };

    if (containerRef.current) {
      handleResize();
      window.addEventListener("resize", handleResize);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  /* TODO: 사이즈에 따라서 바뀌게 수정.. 아마 max size?  */
  const onLeftClick = () => {
    // -1 했을때 0 보다 작은 경우 => 슬라이더의 페이지가 제일 앞인 경우. 0으로 고정.
    if (page - 1 < 0) {
      setPage(0);
    } else {
      setPage((prev) => prev - 1);
    }
  };

  const onRightClick = () => {
    let pageIncrement = 1; // 기본 값 1

    // 0이 아닐경우 => 빈칸이 생겼을 경우.
    if (series.length / 5 !== 0) {
      // 20퍼 기준 5개의 item 표시 남은 item이 18개의 경우 3칸만 움직이면 됨. (18 % 5 = 3) * 0.2 (1개 분량 0.2)
      pageIncrement = Number(((series.length % 5) * 0.2).toFixed(1));
    }
    // page 이동
    setPage((prev) => prev + pageIncrement);
  };

  return (
    <div className="relative w-full">
      {/* FIXME: 애니메이션 수정 */}
      <div
        className="relative flex transform-gpu flex-nowrap transition-all"
        ref={containerRef}
        style={{
          left: `-${page * containerWidth}px`,
        }}
      >
        {series.map((item) => (
          <Link
            href={isMovie ? `/movie/${item.id}` : `/series/${item.id}`}
            key={item.id}
            className="min-w-[20%] max-w-[20%] pr-2 2xl:min-w-[16.66666667%] 3xl:min-w-[12.5%]"
          >
            <Image
              src={item.poster!}
              width={320}
              height={620}
              alt={item.title}
              className="aspect-post h-full overflow-hidden rounded-lg"
            />
          </Link>
        ))}
      </div>
      <div className="absolute flex gap-2">
        <button onClick={onLeftClick}>Left</button>
        <button onClick={onRightClick}>Rigth</button>
      </div>
    </div>
  );
}

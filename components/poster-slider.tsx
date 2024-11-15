import Image from "next/image";

interface SeriesItemProps {
  id: number;
  poster: string | null;
  title: string;
  overview: string;
}
export default function PosterSlider({
  series,
}: {
  series: SeriesItemProps[];
}) {
  return (
    <div className="relative w-full">
      <div className="relative flex flex-nowrap">
        {series.map((item) => (
          <div key={item.id} className="min-w-[25%] pr-2">
            <Image
              src={item.poster!}
              width={320}
              height={620}
              alt={item.title}
              className="overflow-hidden rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

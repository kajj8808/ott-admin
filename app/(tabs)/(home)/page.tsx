import { getNowPlayingSeries } from "./actions";

import { unstable_cache as nextCache } from "next/cache";
import Slider from "@/components/framer-slider";
import ProductSlider from "@/components/product-slider";
import db from "@/lib/db";
import Image from "next/image";
import Link from "next/link";

const getChachedNowPlaying = nextCache(getNowPlayingSeries, ["now-playing"], {
  revalidate: 60,
});

const getSeries = async () => {
  const series = await db.series.findMany();
  return series;
};

export default async function Page() {
  const nowPlayingSeries = await getChachedNowPlaying();
  const allSeries = await getSeries();
  /* const seriesIn2024Q4 = await getSeriesByDateRange(
    new Date(2024, 7, 2),
    new Date(2024, 9, 30)
  ); */

  return (
    <div className="flex flex-col gap-3 pt-3">
      <h3 className="text-sm font-medium sm:text-base md:text-xl">
        Now playing
      </h3>
      <ProductSlider items={nowPlayingSeries} />
      <div className="grid grid-cols-6 gap-px p-3">
        {allSeries.map((series) => (
          <Link key={series.id} href={`/series/${series.id}`}>
            <Image
              alt={series.title}
              src={series.cover_image}
              width={342}
              height={192}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

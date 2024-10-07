import ProductSlider from "@/components/product-slider";

import { getNowPlayingSeries } from "./actions";

import { unstable_cache as nextCache } from "next/cache";

const getChachedNowPlaying = nextCache(getNowPlayingSeries, ["now-playing"], {
  revalidate: 60,
});

export default async function Page() {
  const nowPlayingSeries = await getChachedNowPlaying();
  /* const seriesIn2024Q4 = await getSeriesByDateRange(
    new Date(2024, 7, 2),
    new Date(2024, 9, 30)
  ); */

  return (
    <div className="flex flex-col gap-3 pt-3">
      <h3 className="text-sm font-medium sm:text-base md:text-xl">
        Now playing
      </h3>
      <ProductSlider series={nowPlayingSeries} />
      {/*       <ProductSlider series={seriesIn2024Q4} />
       */}{" "}
    </div>
  );
}

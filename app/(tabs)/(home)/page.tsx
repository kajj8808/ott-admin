import ProductSlider from "@/components/product-slider";
import db from "@/lib/db";
import { unstable_cache as nextCache } from "next/cache";
import Image from "next/image";
import { getNowPlayingSeries, getSeriesByDateRange } from "./actions";

export default async function Page() {
  const nowPlayingSeries = await getNowPlayingSeries();
  const seriesIn2024Q4 = await getSeriesByDateRange(
    new Date(2024, 7, 2),
    new Date(2024, 9, 30)
  );
  console.log(seriesIn2024Q4);

  return (
    <div className="p-5 flex flex-col gap-3">
      <ProductSlider series={nowPlayingSeries} />
      {/*       <ProductSlider series={seriesIn2024Q4} />
       */}{" "}
    </div>
  );
}

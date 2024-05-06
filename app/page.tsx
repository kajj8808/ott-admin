import Image from "next/image";
import { convertSharedUrlToHostedImageUrl } from "./lib/client/utile";
import Link from "next/link";
import ProductItem from "@/components/product-item";
import { unstable_cache } from "next/cache";
import { getSeriesList } from "./data";

const getCachedSeriesList = unstable_cache(
  async () => getSeriesList(),
  ["series-list"]
);

export default async function Home() {
  const seriesList = await getCachedSeriesList();
  return (
    <main className="w-full min-h-screen pb-10 bg-product-background">
      <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {seriesList.map((item) => (
          <ProductItem
            key={item.seriesId}
            id={item.seriesId}
            coverImage={item.coverImage}
            logo={item.logo}
          />
        ))}
      </div>
    </main>
  );
}

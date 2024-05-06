import { getSeriesList } from "@/app/data";
import ProductItem from "@/components/product-item";
import SeriesModal from "@/components/series-modal";
import { unstable_cache } from "next/cache";

const getCachedSeriesList = unstable_cache(
  async () => getSeriesList(),
  ["series-list"]
);
export default async function SeriesPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const seriesList = await getCachedSeriesList();
  const currentSeries = seriesList.find((series) => series.seriesId === +id);
  console.log(currentSeries);
  return (
    <main className="w-full h-screen pb-10 overflow-hidden bg-product-background">
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
      <SeriesModal
        coverImage={currentSeries?.coverImage!}
        logo={currentSeries?.logo!}
        seriesId={id}
      />
    </main>
  );
}

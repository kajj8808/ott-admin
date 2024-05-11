import { getSeries, getSeriesList } from "@/app/data";
import ProductItem from "@/components/product-item";
import ProductList from "@/components/product-list";
import SeriesModal from "@/components/series-modal";
import { unstable_cache } from "next/cache";

export default async function SeriesPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const series = await getSeries(+id);
  return (
    <main className="w-full h-svh pb-10 overflow-hidden bg-product-background">
      <ProductList />
      <SeriesModal
        coverImage={series?.coverImage!}
        logo={series?.logo!}
        seriesId={id}
        seasons={series?.seasons!}
      />
    </main>
  );
}

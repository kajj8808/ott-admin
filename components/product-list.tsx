import { getSeriesList } from "@/app/data";
import ProductItem from "./product-item";
export const revalidate = 0; //Very important

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export default async function ProductList() {
  const seriesList = await getSeriesList();

  return (
    <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
      {seriesList.map((series) => (
        <ProductItem
          key={series.id}
          id={series.id}
          coverImage={series.coverImage}
          logo={series.logo ? series.logo : undefined}
        />
      ))}
    </div>
  );
}

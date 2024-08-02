import Image from "next/image";
import { convertSharedUrlToHostedImageUrl } from "./lib/client/utile";
import Link from "next/link";
import ProductItem from "@/components/product-item";
import { unstable_cache } from "next/cache";
import { getSeriesList } from "./data";
import ProductList from "@/components/product-list";

/* const getCachedSeriesList = unstable_cache(
  async () => ,
  ["series-list"]
); */
export const revalidate = 0; //Very important

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export default async function Home() {
  return (
    <main className="w-full min-h-svh h-full pb-10 bg-product-background">
      <ProductList />
    </main>
  );
}

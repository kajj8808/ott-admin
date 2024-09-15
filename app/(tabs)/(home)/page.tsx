import ProductSlider from "@/components/product-slider";
import db from "@/lib/db";
import { unstable_cache as nextCache } from "next/cache";
import Image from "next/image";
import { getSeries } from "./actions";

export default async function Page() {
  const nowPlayingSeries = await getSeries();
  return (
    <div className="p-5 flex flex-col gap-3">
      <ProductSlider series={nowPlayingSeries} />
    </div>
  );
}

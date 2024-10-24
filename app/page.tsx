import Slider from "@/components/slider";
import db from "@/lib/db";

const getSeries = async () => {
  const series = await db.series.findMany();
  return series;
};
export default async function Home() {
  const series = await getSeries();

  return (
    <div>
      <span className="text-9xl">Hello?</span>
      <Slider series={series} />
    </div>
  );
}

import Slider from "@/components/slider";
import db from "@/lib/db";
import Image from "next/image";

const getSeries = async () => {
  const series = await db.series.findMany();
  return series;
};
export default async function Home() {
  const series = await getSeries();

  return (
    <div className="w-full overflow-hidden">
      <span className="text-9xl">Hello?</span>
      <Slider series={series} />
      <div className="grid grid-cols-4 gap-2">
        {series.map((series) => (
          <div key={series.id} className="relative overflow-hidden rounded-lg">
            <Image
              src={series.cover_image}
              alt={series.title}
              width={341}
              height={192}
              className="pointer-events-none"
            />

            <h4 className="absolute bottom-6 z-50">{series.title}</h4>
            <div className="absolute left-0 top-0 z-40 h-full w-full bg-gradient-to-b from-transparent to-blue-300"></div>
            {/* <h5>{series.overview}</h5> */}
          </div>
        ))}
      </div>
    </div>
  );
}

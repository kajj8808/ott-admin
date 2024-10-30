import GradientText from "@/components/gradient-text";
import SeriesItem from "@/components/series-item";
import Slider from "@/components/slider";
import db from "@/lib/db";

const getSeries = async () => {
  const series = await db.series.findMany({
    orderBy: {
      update_at: "desc",
    },
  });
  return series;
};
export default async function Home() {
  const series = await getSeries();

  return (
    <div className="w-full overflow-hidden">
      <div className="p-3">
        <GradientText>
          <h3 className="text-3xl font-medium">NEXT FLIX</h3>
        </GradientText>
      </div>
      <div className="flex flex-col gap-2">
        <h4>Now Playing</h4>
        <Slider series={series} />
      </div>
      <div className="grid max-w-7xl grid-cols-2 gap-2 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {series.map((series) => (
          <SeriesItem
            key={series.id}
            id={series.id}
            coverImage={series.cover_image}
            title={series.title}
            overview={series.overview}
          />
        ))}
      </div>
    </div>
  );
}

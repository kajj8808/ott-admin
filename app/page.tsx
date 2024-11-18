import GradientText from "@/components/gradient-text";
import MainSlider from "@/components/main-slider";
import SeriesItem from "@/components/series-item";
/* import PosterSlider from "@/components/poster-slider";
import SeriesItem from "@/components/series-item"; */
import db from "@/lib/db";

const getSeries = async () => {
  const series = await db.series.findMany({
    where: {
      episodes: {
        some: {},
      },
    },
    orderBy: {
      update_at: "desc",
    },
  });
  return series;
};
export default async function Home() {
  const series = await getSeries();

  return (
    <div className="flex h-dvh w-full animate-fade flex-col overflow-x-hidden scroll-smooth">
      <div className="z-40 p-3">
        <GradientText>
          <h3 className="text-3xl font-semibold">NEXT FLIX</h3>
        </GradientText>
      </div>
      <div className="flex justify-center px-5">
        <div className="w-full overflow-visible px-5">
          <MainSlider series={series} />
        </div>
      </div>
      {/*       <div className="relative w-full p-5"></div>
       */}{" "}
      {/*  <PosterSlider series={series} />
       */}
      <div className="flex justify-center">
        <div className="grid grid-cols-2 gap-2 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
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
    </div>
  );
}

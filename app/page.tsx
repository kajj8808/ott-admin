import GradientText from "@/components/gradient-text";
import MainSlider from "@/components/main-slider";
import PosterSlider from "@/components/poster-slider";
/* import SeriesItem from "@/components/series-item";
 */ /* import PosterSlider from "@/components/poster-slider";
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
const getMovies = async () => {
  const movies = await db.movie.findMany({
    orderBy: {
      id: "desc",
    },
  });
  return movies;
};
export default async function Home() {
  const series = await getSeries();
  const movies = await getMovies();
  return (
    <div className="flex h-dvh w-full animate-fade flex-col overflow-x-hidden scroll-smooth p-5">
      <div className="z-40">
        <GradientText>
          <h3 className="text-3xl font-semibold">NEXT FLIX</h3>
        </GradientText>
      </div>
      <div className="flex justify-center">
        <div className="w-full overflow-visible">
          <MainSlider series={series} />
        </div>
      </div>
      {/*       <div className="relative w-full p-5"></div>
       */}{" "}
      <div className="flex flex-col gap-5">
        <PosterSlider key={"seires_slider"} series={series} />
        <PosterSlider key={"movies_slider"} isMovie={true} series={movies} />
      </div>
      {/* <div className="flex justify-center">
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
      </div> */}
    </div>
  );
}

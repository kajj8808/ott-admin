import db from "@/lib/db";
import Link from "next/link";
import { unstable_cache as nextCache } from "next/cache";

const getSeries = async () => {
  const today = new Date();
  const sevenDaysLater = new Date();
  sevenDaysLater.setDate(today.getDate() + 7);
  const series = await db.series.findMany({
    select: {
      id: true,
      title: true,
      cover_image: true,
      genres: true,
    },
    where: {
      update_at: {
        gte: today,
        lte: sevenDaysLater,
      },
    },
    orderBy: {
      update_at: "desc",
    },
  });
  return series;
};

const getEpisdoes = async () => {
  const episodes = await db.episode.findMany({
    take: 10,
    orderBy: {
      video_id: "desc",
    },
  });
  return episodes;
};

const getCachedEpisodes = nextCache(getEpisdoes, ["watch"], {
  revalidate: 30,
});

export default async function Page() {
  const series = await getSeries();
  return (
    <div className="flex flex-col gap-5">
      {series.map((episode) => (
        <Link href={`/watch/${episode.id}`} key={episode.id}>
          {episode.title}
        </Link>
      ))}
    </div>
  );
}

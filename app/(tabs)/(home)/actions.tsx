import db from "@/lib/db";
import { Prisma } from "@prisma/client";
import { unstable_cache as nextCache } from "next/cache";

export const getSeries = async () => {
  const today = new Date();
  const sevenDaysLater = new Date();
  sevenDaysLater.setDate(today.getDate() - 7);
  const series = await db.series.findMany({
    select: {
      id: true,
      title: true,
      cover_image: true,
      genres: true,
    },
    where: {
      update_at: {
        gte: sevenDaysLater,
        lte: today,
      },
    },
    orderBy: {
      update_at: "desc",
    },
  });
  return series;
};

export type Series = Prisma.PromiseReturnType<typeof getSeries>;

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

import db from "@/lib/db";
import { Prisma } from "@prisma/client";
import { unstable_cache as nextCache } from "next/cache";

export const getNowPlayingSeries = async () => {
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

export const getSeriesByDateRange = async (startDate: Date, endDate: Date) => {
  const seasons = await db.season.findMany({
    select: {
      series: {
        select: {
          id: true,
          title: true,
          cover_image: true,
          genres: true,
        },
      },
    },
    where: {
      air_date: {
        gte: startDate,
        lte: endDate,
      },
    },
    orderBy: {
      series: {
        update_at: "desc",
      },
    },
  });
  const series = seasons.map((season) => season.series);
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

/* export type Series = Prisma.PromiseReturnType<typeof getNowPlayingSeries>; */
export interface Series {
  id: number;
  title: string;
  cover_image: string;
  genres: {
    id: number;
    name: string;
  }[];
}

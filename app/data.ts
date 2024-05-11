import db from "./lib/server/db";
/* 받아서 nowplying 이렇게 */
export async function getSeriesList() {
  const series = await db.series.findMany({
    where: {
      seasons: {
        some: {
          nyaaQuery: { not: null },
        },
      },
    },
  });

  return series;
}
export async function getSeries(id: number) {
  const series = await db.series.findUnique({
    where: { id: id },
    include: {
      seasons: {
        where: {
          nyaaQuery: { not: null },
        },
        select: { id: true, name: true },
      },
    },
  });

  return series;
}
export async function getEpisodes(seasonId: number) {
  console.log(seasonId);
  const season = await db.season.findUnique({
    where: {
      id: seasonId,
    },
    include: {
      episodes: {
        orderBy: {
          number: "asc",
        },
      },
    },
  });
  (BigInt.prototype as any).toJSON = function () {
    return this.toString();
  };
  return season?.episodes;
}

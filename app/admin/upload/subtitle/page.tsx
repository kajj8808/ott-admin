import db from "@/lib/db";
import { Prisma } from "@prisma/client";

async function getAnimationList() {
  /* const series = await db.series.findMany({
    select: {
      id: true,
      title: true,
    },
  }); */

  const episodes = await db.episode.findMany({
    select: {
      title: true,
      id: true,
      Season: {
        select: {
          id: true,
          name: true,
          series: {
            select: {
              id: true,
              title: true,
              coverImage: true,
            },
          },
        },
      },
    },
  });

  return episodes;
}

export type AnimationList = Prisma.PromiseReturnType<typeof getAnimationList>;

export default async function SubtitleUploadPage() {
  getAnimationList();
  /* const series = await getSeriesList();
  console.log(series); */
  return <div></div>;
}

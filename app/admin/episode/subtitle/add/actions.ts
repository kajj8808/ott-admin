"use server";

import db from "@/lib/db";
import { convertAssToVtt } from "@/lib/server/assToVtt";
import { convertSmiToVtt } from "@/lib/server/smiToVtt";

export const getEpisodes = async () => {
  const episodes = await db.episode.findMany({
    where: {
      subtitle_id: null,
    },
    select: {
      id: true,
      title: true,
      number: true,
      video_id: true,
      season: {
        select: {
          name: true,
          number: true,
        },
      },
      series: {
        select: {
          title: true,
        },
      },
    },
    orderBy: {
      id: "desc",
    },
  });
  return episodes;
};

export const addSubtitle = async (_: any, formData: FormData) => {
  console.log(formData);
};

export const subtitleTextToVttText = async (
  subtitleText: string,
  subtitleName: string
) => {
  let vttContnet = "";
  if (subtitleName.includes(".ass")) {
    vttContnet = convertAssToVtt(subtitleText);
  } else if (subtitleName.includes(".smi")) {
    vttContnet = convertSmiToVtt(subtitleText);
  }

  return vttContnet;
};

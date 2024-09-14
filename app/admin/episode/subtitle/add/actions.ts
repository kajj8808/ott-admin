"use server";

import db from "@/lib/db";
import { convertAssToVtt } from "@/lib/server/assToVtt";
import { convertSmiToVtt } from "@/lib/server/smiToVtt";
import { revalidatePath } from "next/cache";
import { z } from "zod";

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

const checkSubtitleFile = (filename: string) => {
  return filename.includes(".ass") || filename.includes(".smi");
};

const addSubtitleSchema = z.object({
  isOverlap: z.string().nullable(),
  subtitle: z.any().refine((file: File) => checkSubtitleFile(file.name)),
  episodeId: z.string(),
  videoId: z.string(),
});
export const addSubtitle = async (_: any, formData: FormData) => {
  const data = {
    isOverlap: formData.get("is_overlap"),
    subtitle: formData.get("subtitle"),
    episodeId: formData.get("episode_id"),
    videoId: formData.get("video_id"),
  };
  const result = addSubtitleSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const subtitleForm = new FormData();
    subtitleForm.append("subtitle", result.data.subtitle);
    subtitleForm.append("episode_id", result.data.episodeId);
    if (result.data.isOverlap) {
      subtitleForm.append("is_overlap", result.data.isOverlap);
      subtitleForm.append("video_id", result.data.videoId);
    }
    const json = await (
      await fetch(`${process.env.MEDIA_SERVER_URL}/subtitle`, {
        method: "POST",
        body: subtitleForm,
      })
    ).json();
    console.log(json);
    revalidatePath(`episode-${result.data.episodeId}`);
  }
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

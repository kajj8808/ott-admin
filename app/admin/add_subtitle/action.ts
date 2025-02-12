"use server";
import { convertAssToVtt } from "@/app/lib/server/assToVtt";
import { convertSmiToVtt } from "@/app/lib/server/smiToVtt";
import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";

export interface Episode {
  id: string;
  number: number;
  title: string;
  video_id: string;
  series: {
    title: string;
  };
  season: {
    name: string;
  };
}
export async function getNonSubtitleEpisode() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/episode/no-subtitles`,
    {
      method: "GET",
    },
  );

  if (response.ok) {
    const json = (await response.json()).episodes as Episode[];
    return json;
  }
  // revalidateTag("subtitle");
}

export const subtitleTextToVttText = async (
  subtitleText: string,
  subtitleName: string,
) => {
  let vttContnet = "";
  if (subtitleName.includes(".ass")) {
    vttContnet = convertAssToVtt(subtitleText);
  } else if (subtitleName.includes(".smi")) {
    vttContnet = convertSmiToVtt(subtitleText);
  }

  return vttContnet;
};

const checkSubtitleFile = (filename: string) => {
  return filename.includes(".ass") || filename.includes(".smi");
};

const addSubtitleSchema = z.object({
  isOverlap: z.string().nullable(),
  subtitle: z.any().refine((file: File) => checkSubtitleFile(file.name)),
  episodeId: z.string(),
});
export async function addSubtitle(_: any, formData: FormData) {
  const data = {
    isOverlap: formData.get("is_overlap"),
    subtitle: formData.get("subtitle"),
    episodeId: formData.get("episode_id"),
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
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/subtitle/upload`,
      {
        method: "POST",
        body: subtitleForm,
      },
    );
    if (response.ok) {
      revalidateTag("subtitle");
    }
  }
}

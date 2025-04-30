"use server";
import { convertAssToVtt } from "@/app/lib/server/assToVtt";
import { convertSmiToVtt } from "@/app/lib/server/smiToVtt";
import { convertSrtToVtt } from "@/app/lib/server/srtToVtt";
import { Season, Series } from "@/types/interfaces";
import { revalidateTag } from "next/cache";
import { z } from "zod";

export interface NonSubtitleVideoConent {
  id: number;
  watch_id: string;
  subtitle_id: number | null;
  type: "EPISODE" | "MOVIE";
  opening_start: number | null;
  opening_end: number | null;
  ending_start: number | null;
  ending_end: number | null;
  magnet_id: number;
  created_at: string;
  updated_at: string;
  episode?: {
    id: number;
    season_id: number;
    series_id: number;
    video_content_id: number;
    episode_number: number;
    name: string;
    overview: string;
    still_path: string;
    runtime: number;
    is_korean_translated: boolean;
    created_at: string;
    updated_at: string;
  } | null;
  movie?: unknown | null;
  series: Series;
  season: Season;
}
export async function getNonSubtitleVideoConent() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/videos/no-subtitle`,
    {
      method: "GET",
    },
  );

  if (response.ok) {
    const json = (await response.json()).episodes as NonSubtitleVideoConent[];
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
  } else if (subtitleName.includes(".srt")) {
    vttContnet = convertSrtToVtt(subtitleText);
  } else if (subtitleName.includes(".vtt")) {
    vttContnet = subtitleText;
  }

  return vttContnet;
};

const checkSubtitleFile = (filename: string) => {
  return (
    filename.includes(".ass") ||
    filename.includes(".smi") ||
    filename.includes(".srt") ||
    filename.includes(".vtt")
  );
};

const addSubtitleSchema = z.object({
  isOverlap: z.string().nullable(),
  subtitle: z.any().refine((file: File) => checkSubtitleFile(file.name)),
  videoContentId: z.string(),
});
export async function addSubtitle(_: unknown, formData: FormData) {
  const data = {
    isOverlap: formData.get("is_overlap"),
    subtitle: formData.get("subtitle"),
    videoContentId: formData.get("video_content_id"),
  };
  const result = addSubtitleSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const subtitleForm = new FormData();
    subtitleForm.append("subtitle", result.data.subtitle);
    subtitleForm.append("video_content_id", result.data.videoContentId);
    if (result.data.isOverlap) {
      subtitleForm.append("is_overlap", result.data.isOverlap);
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/subtitle/upload`,
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

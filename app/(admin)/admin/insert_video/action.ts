"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

const moiveSchema = z.object({
  title: z.string(),
  description: z.string(),
  poster: z.string(),
  thumbnail: z.string().nullable(),
  runningTime: z.string(),
  videoId: z.string(),
  seriesId: z.string().nullable(),
});

export async function insertMovie(_: unknown, formData: FormData) {
  const data = {
    title: formData.get("title"),
    description: formData.get("description"),
    poster: formData.get("poster"),
    thumbnail: formData.get("still_path"),
    runningTime: formData.get("running_time"),
    videoId: formData.get("video"),
    seriesId: formData.get("series_id"),
  };

  const result = moiveSchema.safeParse(data);

  if (!result.success) {
    return {
      errors: result.error.flatten(),
    };
  } else {
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/movie/insert`, {
      method: "POST",
      body: JSON.stringify(result.data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return {
      errors: null,
    };
  }
}
/* 
title
description
thumbnail
running_time
number
video_id
season_id
series_id */

const episodeSchema = z.object({
  title: z.string(),
  description: z.string(),
  thumbnail: z.string(),
  running_time: z.string(),
  number: z.number(),
  videoId: z.string(),
  seasonId: z.string(),
});

export async function insertEpisode(_: unknown, formData: FormData) {
  const data = {
    title: formData.get("title"),
    description: formData.get("description"),
    thumbnail: `${process.env.NEXT_PUBLIC_BACKEND_URL}/image/${formData.get("thumbnail")}`,
    running_time: formData.get("running_time"),
    number: Number(formData.get("number")),
    videoId: formData.get("video"),
    seasonId: formData.get("season_id"),
  };
  const result = episodeSchema.safeParse(data);

  if (!result.success) {
    return {
      errors: result.error.flatten(),
    };
  } else {
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/episode/insert`, {
      method: "POST",
      body: JSON.stringify(result.data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    redirect("/admin");
  }
}

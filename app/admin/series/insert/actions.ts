"use server";

import { z } from "zod";

const formSchema = z.object({
  tmdbId: z.string().min(1),
});

export async function autoSeriesInsert(_: unknown, formData: FormData) {
  const data = {
    tmdbId: formData.get("tmdb_id"),
  };
  const result = formSchema.safeParse(data);

  if (!result.success) {
    return {
      ok: false,
      errors: result.error.flatten(),
    };
  } else {
    const json = await (
      await fetch(`${process.env.MEDIA_SERVER_URL}/series/insert`, {
        method: "POST",
        body: JSON.stringify({
          tmdb_id: result.data.tmdbId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
    ).json();
    return {
      ok: json.ok,
    };
  }
}

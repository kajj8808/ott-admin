"use server";

import { z } from "zod";

const formSchema = z.object({
  tmdbId: z.string().min(1),
});
export async function registerSeries(_: any, formData: FormData) {
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
    console.log(`http://localhost:3000/series/insert`);

    const json = await (
      await fetch(`${process.env.MEDIA_SERVER_URL}/series/insert`, {
        method: "POST",
        body: formData,
      })
    ).json();

    return {
      ok: json.ok,
    };
  }
}

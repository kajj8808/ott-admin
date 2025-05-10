"use server";
import { redirect } from "next/navigation";
import { z } from "zod";

const formSchema = z.object({
  magnetUrl: z.string(),
  seriesId: z.string().nullable(),
  isIncludeSeries: z.boolean(),
});

export async function addMagnet(_: unknown, formData: FormData) {
  const data = {
    magnetUrl: formData.get("magnet_url"),
    seriesId: formData.get("series_id"),
    isIncludeSeries: formData.get("is_include_series") === "on",
  };
  const result = formSchema.safeParse(data);
  if (!result.success) {
    return { errors: result.error.flatten() };
  } else {
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/movie/add_magnet`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(result.data),
    });
    redirect("/admin");
  }
}
interface SeriesResponse {
  ok: boolean;
  series: {
    id: number;
    title: string;
  }[];
}
export async function getSeries() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/series/list`,
  );
  if (response.ok) {
    const json = (await response.json()) as SeriesResponse;

    return json.series;
  }
}

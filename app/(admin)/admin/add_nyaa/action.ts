"use server";
import { redirect } from "next/navigation";
import { z } from "zod";

const formSchema = z.object({
  nyaaQuery: z.string(),
  seasonId: z.string(),
});

export async function addNyaa(_: unknown, formData: FormData) {
  const data = {
    nyaaQuery: formData.get("nyaa_query"),
    seasonId: formData.get("season_id"),
  };
  const result = formSchema.safeParse(data);
  if (!result.success) {
    return { errors: result.error.flatten() };
  } else {
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/season/add_nyaa`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(result.data),
    });
    redirect("/admin");
  }
}
export interface Season {
  number: number;
  id: number;
  name: string;
  series: {
    id: number;
    title: string;
  };
}

export async function getSasons() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/season/list/not-nyaa`,
  );
  if (response.ok) {
    const json = (await response.json()).seasons as Season[];
    return json;
  }
}

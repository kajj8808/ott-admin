"use server";
import { redirect } from "next/navigation";
import { z } from "zod";

const formSchema = z.object({
  magnetUrl: z.string(),
  seasonId: z.string(),
});

export async function addMagnet(_: unknown, formData: FormData) {
  const data = {
    magnetUrl: formData.get("magnet_url"),
    seasonId: formData.get("season_id"),
  };
  const result = formSchema.safeParse(data);
  if (!result.success) {
    return { errors: result.error.flatten() };
  } else {
    await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/season/add_magnet`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(result.data),
      },
    );
    redirect("/admin");
  }
}

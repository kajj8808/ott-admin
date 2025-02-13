"use server";
import { redirect } from "next/navigation";
import { z } from "zod";

const formSchema = z.object({
  seriesId: z.string(),
});

export async function insertSeries(_: unknown, formData: FormData) {
  const data = {
    seriesId: formData.get("series_id"),
  };
  const result = formSchema.safeParse(data);

  if (!result.success) {
    return {
      seriesId: Number(data.seriesId),
      errors: result.error.flatten(),
    };
  } else {
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/series/insert`, {
      method: "POST",
      body: JSON.stringify({ seriesId: result.data.seriesId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    redirect("/admin");
  }
}

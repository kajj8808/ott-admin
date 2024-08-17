"use server";

import { File } from "buffer";
import { z } from "zod";

const checkSubtitleFile = (file: File) =>
  file.name.includes(".smi") || file.name.includes(".ass");

const formSchema = z.object({
  file: z.instanceof(File).refine(checkSubtitleFile),
});

export async function uploadSubtitle(_: any, formData: FormData) {
  const data = {
    file: formData.get("file"),
  };
  const result = formSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    await fetch(`${process.env.BACKEND_URL}/upload/subtitle`, {
      body: formData,
      method: "POST",
    });
  }
}

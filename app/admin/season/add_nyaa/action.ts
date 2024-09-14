"use server";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const formSchema = z.object({
  nyaaQuery: z.string().min(1),
  seasonId: z.coerce.number(),
  seriesId: z.coerce.number(),
});

export async function getSeasonsExcludingNyaaQuery() {
  const seasons = await db.season.findMany({
    where: {
      nyaa_query: null,
    },
    select: {
      id: true,
      name: true,
      series: {
        select: {
          id: true,
          title: true,
        },
      },
    },
    orderBy: {
      series_id: "desc",
    },
    take: 40,
  });
  return seasons;
}

export async function addNyaaQuery(_: any, fromData: FormData) {
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  const data = {
    nyaaQuery: fromData.get("nyaa_query"),
    seasonId: fromData.get("season_id"),
    seriesId: fromData.get("series_id"),
  };
  const result = formSchema.safeParse(data);
  if (!result.success) {
    return {
      seasonId: Number(data.seasonId!),
      errors: result.error.flatten(),
    };
  } else {
    const updatedSeason = await db.season.update({
      where: {
        id: result.data.seasonId,
      },
      data: {
        nyaa_query: result.data.nyaaQuery,
        auto_upload: true,
      },
      select: {
        id: true,
      },
    });
    if (updatedSeason) {
      revalidatePath("/admin/season/add_nyaa");
    }
  }
}

export type NotNyaaSeaons = Prisma.PromiseReturnType<
  typeof getSeasonsExcludingNyaaQuery
>;

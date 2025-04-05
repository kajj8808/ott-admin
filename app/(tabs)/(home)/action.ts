"use server";

import type { Episode } from "@/types/interfaces";

interface NewEpisodesResult {
  ok: boolean;
  result: Episode[];
}
export const getNewEpisode = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/episode/new`);
  const json = (await res.json()) as NewEpisodesResult;
  if (json.ok) {
    return json.result;
  } else {
    return null;
  }
};

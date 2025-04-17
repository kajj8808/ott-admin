"use server";

import type { Episode } from "@/types/interfaces";

interface NewEpisodesResult {
  ok: boolean;
  result: Episode[];
}
export const getNewEpisode = async () => {
  console.log(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/episodes/new`);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/episodes/new`,
  );
  const json = (await res.json()) as NewEpisodesResult;
  if (json.ok) {
    return json.result;
  } else {
    return null;
  }
};

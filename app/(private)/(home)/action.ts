"use server";
interface Episode {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  running_time: number | null;
  number: number;
  video_id: string;
  subtitle_id: number | null;
  is_overlap: boolean | null;
  is_special: boolean | null;
  kr_description: boolean;
  create_at: string;
  update_at: string;
  season_id: number;
  series_id: number;
  magnet_id: number;
}
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

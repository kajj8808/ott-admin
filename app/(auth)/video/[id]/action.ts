import { Episode } from "@/types/interfaces";

interface VideoContent {
  id: number;
  watch_id: string;
  subtitle_id: number | null;
  type: "EPISODE" | "MOVIE";
  opening_start: number | null;
  opening_end: number | null;
  ending_start: number | null;
  ending_end: number | null;
  magnet_id: number;
  created_at: string;
  updated_at: string;
  episode?: Episode;
  movie?: unknown | null;
}

interface VideoContentResponse {
  ok: boolean;
  result: VideoContent;
}

export const getVideoContent = async (videoContentId: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/video/video-content/${videoContentId}`,
  );
  const json = (await res.json()) as VideoContentResponse;
  console.log(json);
  if (json.ok) {
    return json.result;
  } else {
    return null;
  }
};

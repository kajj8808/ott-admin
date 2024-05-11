import { getEpisodes } from "@/app/data";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const episodes = await getEpisodes(+params.id);
  return NextResponse.json({ ok: true, episodes: episodes });
}

import { getEpisodes } from "@/app/data";
import { NextRequest, NextResponse } from "next/server";
import db from "@/app/lib/server/db";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const episode = await db.episode.findUnique({
      where: {
        id: +params.id,
      },
    });
    return NextResponse.json({ ok: true, episode });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ ok: true });
  }
}

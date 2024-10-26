import VideoPlayer from "@/components/video-player";
import db from "@/lib/db";
import { notFound } from "next/navigation";

type Params = Promise<{ id: string }>;

const getEpisode = async (id: number) => {
  const episode = await db.episode.findUnique({
    where: {
      id: id,
    },
  });
  return episode;
};

export default async function Page({ params }: { params: Params }) {
  const { id } = await params;
  if (isNaN(Number(id))) {
    return notFound();
  }

  const episode = await getEpisode(Number(id));

  return (
    <div>
      <VideoPlayer
        videoUrl={`${process.env.MEDIA_SERVER_URL}/video/${episode?.video_id}`}
      />
    </div>
  );
}

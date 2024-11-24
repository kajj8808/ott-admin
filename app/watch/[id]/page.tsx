import VideoPlayer from "@/components/video-player";
import db from "@/lib/db";
import { notFound } from "next/navigation";

type Params = Promise<{ id: string }>;

const getEpisode = async (videoId: string) => {
  const episode = await db.episode.findFirst({
    where: {
      video_id: videoId,
    },
  });
  return episode;
};

const getMovie = async (videoId: string) => {
  const movie = await db.movie.findFirst({
    where: {
      video_id: videoId,
    },
  });
  return movie;
};

export default async function Page({ params }: { params: Params }) {
  const { id } = await params;
  if (isNaN(Number(id))) {
    return notFound();
  }

  const episode = await getEpisode(id);
  const movie = await getMovie(id);

  const data = episode ? { ...episode } : { ...movie };

  console.log(data);
  return (
    <div>
      <VideoPlayer
        videoUrl={`${process.env.MEDIA_SERVER_URL}/video/${data.video_id}`}
        vttUrl={`${process.env.MEDIA_SERVER_URL}/subtitle/${data?.subtitle_id}`}
      />
    </div>
  );
}

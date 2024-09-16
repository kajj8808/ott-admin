import VideoPlayer from "@/components/video-player";
import db from "@/lib/db";
import { unstable_cache as nextCache } from "next/cache";

const getEpisode = async (id: number) => {
  const episode = await db.episode.findUnique({
    where: {
      id: +id,
    },
  });
  return episode;
};

export default async function Page({ params }: { params: { id: number } }) {
  const getCachedEpisodes = nextCache(getEpisode, [`episode-${params.id}`], {
    revalidate: 10,
  });
  const episode = await getCachedEpisodes(params.id);

  return (
    <div className="flex justify-center items-center w-full h-dvh">
      <VideoPlayer
        videoUrl={`${process.env.MEDIA_SERVER_URL}/video/${episode?.video_id}`}
        trackUrl={
          episode?.subtitle_id &&
          `${process.env.MEDIA_SERVER_URL}/subtitle/${episode?.subtitle_id}`
        }
      />
    </div>
  );
}

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

const getCachedEpisodes = nextCache(getEpisode, ["watch"], { revalidate: 180 });
export default async function Page({ params }: { params: { id: number } }) {
  const episode = await getCachedEpisodes(params.id);

  return (
    <div>
      <video
        src={`${process.env.MEDIA_SERVER_URL}/video/${episode?.video_id}`}
        controls
      ></video>
    </div>
  );
}

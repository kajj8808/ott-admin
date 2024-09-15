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
  const getCachedEpisodes = nextCache(getEpisode, [`episode-${params.id}`]);
  const episode = await getCachedEpisodes(params.id);

  return (
    <div>
      <video controls crossOrigin="anonymous">
        <source
          src={`${process.env.MEDIA_SERVER_URL}/video/${episode?.video_id}`}
          type="video/mp4"
        />
        {episode?.subtitle_id ? (
          <track
            src={`${process.env.MEDIA_SERVER_URL}/subtitle/${episode.subtitle_id}`}
            kind="subtitles"
            srcLang="kr"
            label="한국어"
            default
          />
        ) : null}
      </video>
    </div>
  );
}

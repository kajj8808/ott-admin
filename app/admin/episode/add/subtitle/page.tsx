import SubtitleForm from "@/components/subtitle-form";
import db from "@/lib/db";

export const fetchCache = "default-no-store";

async function getNonSubtitleEpisode() {
  const episodes = await db.episode.findMany({
    where: {
      subtitle_id: null,
    },
    include: {
      series: true,
      season: true,
    },
    orderBy: {
      id: "desc",
    },
  });
  return episodes;
}
export default async function Page() {
  const episodes = await getNonSubtitleEpisode();
  return (
    <div className="flex flex-col items-center gap-5">
      {episodes.map((episode) => (
        <SubtitleForm
          key={episode.id}
          episodeId={episode.id}
          title={`${episode.series?.title} ${episode.season?.name} #${episode.number} ${episode.title}`}
          videoUrl={`${process.env.MEDIA_SERVER_URL}/video/${episode.video_id}`}
          videoId={episode.video_id}
        />
      ))}
    </div>
  );
}

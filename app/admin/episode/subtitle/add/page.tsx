import { getEpisodes } from "./actions";
import AddSubtitleForm from "@/components/add-subtitle-form";

export const dynamic = "force-dynamic";

export default async function Page() {
  const episodes = await getEpisodes();

  return (
    <div className="flex flex-col gap-4">
      {episodes.map((episode, key) => (
        <AddSubtitleForm
          key={key}
          episodeId={episode.id}
          episodeTitle={`제${episode.number}화 ${episode.title}`}
          seriesTitle={episode.series?.title!}
          videoUrl={`${process.env.MEDIA_SERVER_URL}/video/${episode?.video_id}`}
          videoId={episode.video_id}
        />
      ))}
    </div>
  );
}

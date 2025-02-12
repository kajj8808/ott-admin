import { unstable_cache as nextCache } from "next/cache";
import { getNonSubtitleEpisode } from "./action";
import SubtitleForm from "@/app/components/subtitle-form";

const getCachedEpisodes = nextCache(getNonSubtitleEpisode, ["subtitle"], {
  revalidate: 30,
  tags: ["subtitle"],
});

export default async function Page() {
  const episodes = await getCachedEpisodes();
  console.log(episodes);
  return (
    <div className="flex w-full flex-col items-center overflow-scroll p-3">
      <h3 className="text-3xl font-bold uppercase">Add Subtitle</h3>

      {episodes ? (
        episodes.map((episode) => (
          <div className="max-w-m min-w-80" key={episode.video_id}>
            <SubtitleForm episode={episode} />
          </div>
        ))
      ) : (
        <span>Episode data를 불러오지 못했습니다.</span>
      )}
    </div>
  );
}

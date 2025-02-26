import { unstable_cache as nextCache } from "next/cache";
import { getNonSubtitleEpisode } from "./action";
import SubtitleForm from "./form";

const getCachedEpisodes = nextCache(getNonSubtitleEpisode, ["subtitle"], {
  revalidate: 30,
  tags: ["subtitle"],
});

export default async function Page() {
  const episodes = await getCachedEpisodes();
  return (
    <div className="flex w-full flex-col items-center p-3">
      <h3 className="text-3xl font-bold uppercase">Add Subtitle</h3>
      <div className="scrollbar-hide flex flex-col overflow-scroll">
        {episodes ? (
          episodes.map((episode) => (
            <SubtitleForm episode={episode} key={episode.id} />
          ))
        ) : (
          <span>Episode data를 불러오지 못했습니다.</span>
        )}
      </div>
    </div>
  );
}

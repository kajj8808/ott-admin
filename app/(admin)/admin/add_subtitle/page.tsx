import { unstable_cache as nextCache } from "next/cache";
import { getNonSubtitleEpisode } from "./action";
import SubtitleForm from "./form";

const getCachedEpisodes = nextCache(getNonSubtitleEpisode, ["subtitle"], {
  revalidate: 30,
  tags: ["subtitle"],
});

export const dynamic = "force-dynamic";

export default async function Page() {
  const episodes = await getCachedEpisodes();
  return (
    <div className="flex h-full w-full flex-col items-center pt-32">
      <h3 className="text-3xl font-bold uppercase">Add Subtitle</h3>
      <div className="mt-5 grid gap-3 pb-3">
        {episodes ? (
          episodes.map((episode) => (
            <div key={episode.id}>
              <SubtitleForm episode={episode} />
            </div>
          ))
        ) : (
          <span>Episode data를 불러오지 못했습니다.</span>
        )}
      </div>
    </div>
  );
}

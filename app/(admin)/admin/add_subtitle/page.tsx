import { unstable_cache as nextCache } from "next/cache";
import { getNonSubtitleVideoConent } from "./action";
import SubtitleForm from "./form";

const getCachedVideoConent = nextCache(
  getNonSubtitleVideoConent,
  ["subtitle"],
  {
    revalidate: 30,
    tags: ["subtitle"],
  },
);

export const dynamic = "force-dynamic";

export default async function Page() {
  const videoConents = await getCachedVideoConent();
  return (
    <div className="flex h-full w-full flex-col items-center pt-32">
      <h3 className="text-3xl font-bold uppercase">Add Subtitle</h3>
      <div className="mt-5 grid gap-3 pb-3">
        {videoConents ? (
          videoConents.map((videoConent) => (
            <div key={videoConent.id}>
              <SubtitleForm videoContent={videoConent} />
            </div>
          ))
        ) : (
          <span>Episode data를 불러오지 못했습니다.</span>
        )}
      </div>
    </div>
  );
}

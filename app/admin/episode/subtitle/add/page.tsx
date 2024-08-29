import db from "@/lib/db";
import { FolderPlusIcon } from "@heroicons/react/24/outline";

const getEpisodes = async () => {
  "use server";
  const episodes = await db.episode.findMany({
    where: {
      subtitle_id: null,
    },
    select: {
      id: true,
      title: true,
      number: true,
      season: {
        select: {
          name: true,
          number: true,
        },
      },
      series: {
        select: {
          title: true,
        },
      },
    },
  });
  return episodes;
};

export default async function Page() {
  const episodes = await getEpisodes();

  return (
    <div className="flex flex-col gap-4">
      {episodes.map((episode) => (
        <form
          key={episode.id}
          className="flex justify-between border p-3 rounded-xl items-center last:mb-3"
        >
          <div className="flex gap-2">
            <h3>{episode.series?.title}</h3>
            <h4>{episode.title}</h4>
          </div>
          <div className="flex">
            <label htmlFor="subtitle" className="cursor-pointer">
              <FolderPlusIcon className="size-8" />
            </label>
          </div>
          <input type="file" name="subtitle" id="subtitle" className="hidden" />
        </form>
      ))}
    </div>
  );
}

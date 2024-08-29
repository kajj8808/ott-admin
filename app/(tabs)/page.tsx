import db from "@/lib/db";
import Link from "next/link";

const getEpisdoes = async () => {
  const episodes = await db.episode.findMany({
    take: 10,
    orderBy: {
      video_id: "desc",
    },
  });
  return episodes;
};
export default async function Page() {
  const episodes = await getEpisdoes();
  return (
    <div className="flex flex-col gap-5">
      {episodes.map((episode) => (
        <Link href={`/watch/${episode.id}`} key={episode.id}>
          {episode.title}
        </Link>
      ))}
    </div>
  );
}

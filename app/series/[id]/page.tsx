import db from "@/lib/db";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Params = Promise<{ id: string }>;

const getSeires = async (id: number) => {
  const series = await db.series.findUnique({
    where: { id: id },
    select: {
      title: true,
      seasons: {
        select: {
          id: true,
          name: true,
          episodes: true,
        },
      },
    },
  });
  if (!series) {
    return notFound();
  }

  return series;
};

export default async function Page({ params }: { params: Params }) {
  const { id } = await params;

  if (isNaN(Number(id))) {
    return notFound();
  }

  const series = await getSeires(Number(id));

  return (
    <div>
      <h2 className="flex justify-center pt-3 text-xl font-semibold">
        {series?.title}
      </h2>
      {series?.seasons.map((season) => (
        <div key={`season-${season.id}`}>
          <h3 className="flex justify-center p-2 text-sm font-medium">
            {season.name}
          </h3>
          <div className="flex flex-col gap-2 px-3 pb-4">
            {season.episodes
              .sort((a, b) => a.number - b.number)
              .map((episode) => (
                <Link
                  href={`/watch/${episode.id}`}
                  key={`episode-${episode.id}`}
                  className="flex border-b border-neutral-700 p-3"
                >
                  <div className="aspect-video w-1/3 overflow-hidden rounded-md">
                    <Image
                      src={episode.thumnail!}
                      width={224}
                      height={132}
                      alt={episode.title}
                      quality={70}
                      loading="lazy"
                      className="w-full animate-pulse"
                    />
                  </div>
                  <div className="flex w-2/3 flex-col justify-center gap-2 pl-2.5">
                    <h5 className="text-sm font-semibold">{`#${episode.number} ${episode.title}`}</h5>
                    <span className="line-clamp-3 text-sm text-neutral-400">
                      {episode.description}
                    </span>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

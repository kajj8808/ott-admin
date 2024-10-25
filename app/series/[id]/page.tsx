import db from "@/lib/db";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const getSeires = async (id: number) => {
  const series = await db.series.findUnique({
    where: { id: id },
    select: {
      seasons: {
        select: {
          id: true,
          name: true,
          episodes: true,
        },
      },
    },
  });

  return series;
};

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;

  if (isNaN(Number(id))) {
    return notFound();
  }

  const series = await getSeires(Number(id));

  return (
    <div>
      {series?.seasons.map((season) => (
        <div key={`season-${season.id}`}>
          <h3>{season.name}</h3>
          {season.episodes.map((episode) => (
            <Link href={`/watch/${episode.id}`} key={`episode-${episode.id}`}>
              <Image
                src={episode.thumnail!}
                width={192}
                height={82}
                alt={episode.title}
              />
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
}

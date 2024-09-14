import db from "@/lib/db";
import Image from "next/image";
import Link from "next/link";

const getSeries = async (id: number) => {
  // 임시
  const series = await db.series.findUnique({
    where: {
      id,
    },
    select: {
      cover_image: true,
      episodes: {
        select: {
          id: true,
          thumnail: true,
          video_id: true,
          number: true,
          title: true,
        },
        orderBy: {
          number: "asc",
        },
      },
    },
  });
  return series;
};
interface SeriesPageProps {
  params: {
    id: string;
  };
}
export default async function Page({ params: { id } }: SeriesPageProps) {
  const series = await getSeries(+id);

  return (
    <div>
      <div className="flex flex-col gap-5 p-5">
        {series?.episodes.map((episode) => (
          <Link href={`/watch/${episode.id}`} key={episode.title}>
            <div className="relative w-44 h-24 overflow-hidden rounded-lg">
              <Image src={episode.thumnail} alt={episode.title} fill />
            </div>
            <h3>
              {episode.number} | {episode.title}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  );
}

import db from "@/lib/db";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Params = Promise<{ id: string }>;

const getMovie = async (id: number) => {
  const movie = await db.movie.findUnique({
    where: { id: id },
    include: {
      series: true,
    },
  });

  if (!movie) {
    return notFound();
  }

  return movie;
};

export default async function Page({ params }: { params: Params }) {
  const { id } = await params;

  if (isNaN(Number(id))) {
    return notFound();
  }

  const movie = await getMovie(Number(id));

  return (
    <div className="flex w-full animate-fade justify-center">
      <div className="max-w-4xl">
        <h2 className="flex justify-center pt-3 text-xl font-semibold">
          {movie.series?.title}
        </h2>

        <div key={`movie-${movie.id}`}>
          <h3 className="flex justify-center p-2 text-sm font-medium">
            {movie.title}
          </h3>
          <div className="flex flex-col gap-2 px-3 pb-4">
            <Link
              href={`/watch/${movie.video_id}`}
              key={`movie-${movie.id}`}
              className="flex border-b border-neutral-700 p-3"
            >
              <div className="aspect-video w-1/3 overflow-hidden rounded-md">
                <Image
                  src={movie.poster}
                  width={224}
                  height={132}
                  alt={movie.title}
                  quality={70}
                  loading="lazy"
                  className="w-full"
                />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

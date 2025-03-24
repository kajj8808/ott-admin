import Image from "next/image";
import { getNewEpisode } from "./action";
import Link from "next/link";

export default async function Home() {
  const episodes = await getNewEpisode();

  return (
    <div className="flex justify-center p-5">
      <div className="grid max-w-screen-xl select-none auto-cols-fr auto-rows-min grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
        {episodes?.map((episode) => (
          <Link
            href={`/video/${episode.video_id}`}
            key={episode.id}
            className="group max-w-sm"
          >
            <h5 className="truncate text-xs text-neutral-400">
              {episode.series.title}
            </h5>
            <h3 className="truncate text-lg font-semibold">
              {episode.season.name} {episode.number}화 [ {episode.title} ]
            </h3>
            <div className="overflow-hidden rounded-md">
              <Image
                src={episode.thumbnail}
                width={320}
                height={240}
                alt={`image-${episode.id}`}
                className="transition group-hover:scale-105"
              />
            </div>
          </Link>
        ))}

        <Link href={"/admin"}>
          <h3>Go To Admin Page!</h3>
        </Link>
      </div>

      {/* <video controls className="aspect-video w-96" crossOrigin="anonymous">
        <source
          src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/video/1738166672747`}
        />
        <track
          src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/subtitle/1738166672747`}
          kind="subtitles"
          srcLang="kr"
          label="한국어"
          default
        />
      </video> */}
    </div>
  );
}

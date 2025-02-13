import { getNewEpisode } from "./action";

export default async function Home() {
  const episodes = await getNewEpisode();
  console.log(episodes);
  return (
    <div className="flex h-[100dvh] items-center justify-center">
      <div className="flex flex-col gap-2">
        {episodes?.map((episode) => (
          <div key={episode.id} className="max-w-sm">
            <h3 className="text-lg font-semibold">{episode.title}</h3>
            <h4 className="truncate text-sm text-neutral-500">
              {episode.description}
            </h4>
          </div>
        ))}
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

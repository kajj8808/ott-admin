const getNewEpisode = async () => {
  const res = await fetch("http://localhost:3003/episode/new");
  const json = await res.json();
  return json;
};

export default async function Home() {
  const episodes = await getNewEpisode();
  console.log(episodes);
  return (
    <div className="flex h-[100dvh] items-center justify-center">
      <video controls className="aspect-video w-96" crossOrigin="anonymous">
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
      </video>
    </div>
  );
}

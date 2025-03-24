import { getSubtitleId } from "./action";

// async function getWatchDetail(id: string) {}
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const { subtitle_id } = await getSubtitleId(id);
  return (
    <div className="flex items-center justify-center">
      <video controls className="aspect-video" crossOrigin="anonymous">
        <source
          src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/video/${id}`}
          type="video/mp4"
        />
        <track
          src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/subtitle/${subtitle_id}`}
          kind="subtitles"
          srcLang="kr"
          label="한국어"
          default
        />
      </video>{" "}
    </div>
  );
}

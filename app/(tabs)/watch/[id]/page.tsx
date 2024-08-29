import db from "@/lib/db";

const getEpisode = async (id: number) => {
  const episode = await db.episode.findUnique({
    where: {
      id: +id,
    },
  });
  return episode;
};
export default async function Page({ params }: { params: { id: number } }) {
  const episode = await getEpisode(params.id);

  return (
    <div>
      <video
        src={`${process.env.MEDIA_SERVER_URL}/video/${episode?.video_id}`}
        controls
      ></video>
    </div>
  );
}

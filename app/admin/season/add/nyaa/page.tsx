import Button from "@/components/button";
import Input from "@/components/input";
import db from "@/lib/db";

async function getSeasonsNotIncludingNyaa() {
  const seasons = await db.season.findMany({
    where: {
      nyaa_query: null,
    },
    include: {
      series: true,
    },
    orderBy: {
      series: {
        update_at: "desc",
      },
    },
    take: 100,
  });
  return seasons;
}
export default async function Page() {
  const seasons = await getSeasonsNotIncludingNyaa();

  return (
    <div className="flex flex-col gap-2 p-8">
      {seasons.map((season) => (
        <div key={season.id} className="border p-2">
          <h3 className="">{`${season.series?.title} ${season.name}`}</h3>
          <form>
            <Input name="nyaa_query" placeholder="nyaa query" />
            <Button text="add nyaa query" />
          </form>
        </div>
      ))}
    </div>
  );
}

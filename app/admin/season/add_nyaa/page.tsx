import { unstable_cache as nextCache } from "next/cache";
import { getSeasonsExcludingNyaaQuery } from "./action";
import AddNyaaForm from "@/components/add-nyaa-form";

const cachedSeasons = nextCache(
  getSeasonsExcludingNyaaQuery,
  ["season_not_nyaa"],
  { revalidate: 300 }
);

export default async function AddNyaa() {
  const seasons = await cachedSeasons();
  return (
    <div className="flex flex-col gap-4">
      {seasons.map((season) => (
        <AddNyaaForm season={season} key={season.id} />
      ))}
    </div>
  );
}

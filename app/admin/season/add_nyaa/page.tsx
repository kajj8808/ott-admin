import { unstable_cache as nextCache } from "next/cache";

import { getSeasonsExcludingNyaaQuery } from "./actions";
import AddNyaaForms from "@/components/add-nyaa-forms";

const cachedSeasons = nextCache(getSeasonsExcludingNyaaQuery, [
  "season_not_nyaa",
]);

export default async function AddNyaa() {
  const seasons = await cachedSeasons();
  return (
    <div>
      <div className="flex flex-col gap-3">
        <AddNyaaForms seasons={seasons} />
      </div>
    </div>
  );
}

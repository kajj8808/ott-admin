"use client";
import { useFormState } from "react-dom";
import { registerSeries } from "./action";

export default function SeriesInsert() {
  const [state, action] = useFormState(registerSeries, null);
  return (
    <div className="w-full">
      <form action={action}>
        <div className="flex flex-col">
          <label htmlFor="tmdb_id">TMDB ID</label>
          <input
            type="text"
            name="tmdb_id"
            id="tmdb_id"
            className="border p-3 rounded-lg"
            placeholder="tmdb_id"
          />
          {state?.fieldErrors.tmdbId?.map((error, key) => (
            <p key={key} className="text-sm text-red-500">
              {error}
            </p>
          ))}
        </div>
        <button className="bg-lime-500 text-white px-3.5 py-2 font-medium rounded-lg hover:bg-lime-400 transition-colors">
          send
        </button>
      </form>
    </div>
  );
}

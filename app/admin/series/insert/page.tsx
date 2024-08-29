"use client";
import Button from "@/components/button";
import { useFormState } from "react-dom";
import { registerSeries } from "./action";
import NotificationBox from "@/components/notification-box";

export default function SeriesInsert() {
  const [state, action] = useFormState(registerSeries, null);

  return (
    <div className="w-full">
      <form action={action} className="flex flex-col gap-3">
        <div className="flex flex-col gap-3">
          <label htmlFor="tmdb_id">TMDB ID</label>
          <input
            type="text"
            name="tmdb_id"
            id="tmdb_id"
            className="border p-3 rounded-lg"
            placeholder="tmdb_id"
          />
          {state?.errors?.fieldErrors.tmdbId?.map((error, key) => (
            <p key={key} className="text-sm text-red-500">
              {error}
            </p>
          ))}
        </div>
        <Button text="send" />
      </form>
      <NotificationBox text={"업로드!"} type="success" />
    </div>
  );
}

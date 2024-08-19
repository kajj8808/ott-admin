"use client";
import {
  addNyaaQuery,
  NotNyaaSeaons,
} from "@/app/admin/season/add_nyaa/actions";
import { useFormState } from "react-dom";
import Button from "./button";

export default function AddNyaaForms({ seasons }: { seasons: NotNyaaSeaons }) {
  const [state, action] = useFormState(addNyaaQuery, null);

  return (
    <div>
      {seasons.map((season) => (
        <form
          action={action}
          key={season.id}
          className="border p-5 rounded-xl shadow-sm flex items-center justify-between"
        >
          <div className="flex flex-col gap-2">
            <div className="flex gap-3">
              <p>{season.series?.title} </p>
              <p>{season.name}</p>
            </div>
            <div className="flex flex-col gap-1">
              <input
                type="text"
                name="nyaa_query"
                placeholder="nyaa_query"
                className="outline-none"
              />
              {state?.seasonId === season.id ? (
                <span className="text-red-500 text-sm">
                  {state?.errors.fieldErrors.nyaaQuery}
                </span>
              ) : null}
            </div>
            <input
              type="text"
              className="hidden"
              name="season_id"
              defaultValue={season.id}
            />
            <input
              type="text"
              className="hidden"
              name="series_id"
              defaultValue={season.series?.id}
            />
          </div>
          <div className="flex justify-center">
            <Button text="Add Nyaa Query" />
          </div>
        </form>
      ))}
    </div>
  );
}

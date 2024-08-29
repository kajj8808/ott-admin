"use client";
import {
  addNyaaQuery,
  NotNyaaSeaons,
} from "@/app/admin/season/add_nyaa/action";
import { useFormState } from "react-dom";
import Button from "./button";

interface AddNyaaFormProps {
  season: NotNyaaSeaons[0];
}

export default function AddNyaaForm({ season }: AddNyaaFormProps) {
  const [state, action] = useFormState(addNyaaQuery, null);

  return (
    <form
      action={action}
      key={season.id}
      className="border p-5 rounded-xl shadow-md flex items-center justify-between last:mb-5"
    >
      <div className="flex flex-col gap-2">
        <div className="flex gap-3">
          <p className="max-w-56 whitespace-nowrap overflow-hidden text-ellipsis">
            {season.series?.title}
          </p>
          <p className="max-w-56 whitespace-nowrap overflow-hidden text-ellipsis">
            {season.name}
          </p>
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
  );
}

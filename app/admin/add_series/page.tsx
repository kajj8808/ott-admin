"use client";

import { useActionState } from "react";
import { insertSeries } from "../add_series/action";

import { ArrowPathIcon } from "@heroicons/react/24/solid";

export default function AddSeries() {
  const [state, action, pending] = useActionState(insertSeries, null);
  return (
    <div className="flex h-dvh w-full flex-col items-center justify-center bg-neutral-900">
      <h3 className="text-3xl font-bold uppercase">Add Series</h3>
      <form action={action} className="mt-5 flex flex-col gap-2">
        <input
          type="text"
          name="series_id"
          id="series_id"
          placeholder="TMDB SERIES ID"
          className="rounded-sm p-3 text-center text-neutral-900 focus:outline-none"
        />
        <button
          className="flex justify-center rounded-sm border p-3 uppercase outline-none transition hover:bg-white hover:text-neutral-900 disabled:animate-pulse"
          disabled={pending}
        >
          {pending ? (
            <div className="size-6 animate-spin">
              <ArrowPathIcon />
            </div>
          ) : (
            <span>Send</span>
          )}
        </button>
      </form>
    </div>
  );
}

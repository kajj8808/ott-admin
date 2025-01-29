"use client";

import { useActionState } from "react";
import { insertSeries } from "../add_series/action";
import { useFormStatus } from "react-dom";

import { ArrowPathIcon } from "@heroicons/react/24/solid";

export default function AddSeries() {
  const [state, action] = useActionState(insertSeries, null);
  const { pending } = useFormStatus();

  return (
    <div className="flex h-dvh w-full flex-col items-center justify-center bg-neutral-900">
      <h3 className="text-3xl font-bold uppercase">Add Series</h3>
      <form action={action} className="mt-5 flex flex-col gap-2">
        <input
          type="text"
          name="series_id"
          id="series_id"
          placeholder="TMDB SERIES ID"
          className="rounded-sm p-3 text-center text-lg font-semibold text-neutral-900"
        />
        <button
          className={`rounded-sm border p-3 uppercase outline-none hover:bg-white hover:font-semibold hover:text-neutral-900`}
        >
          {pending ? <ArrowPathIcon /> : <ArrowPathIcon />}
        </button>
      </form>
    </div>
  );
}

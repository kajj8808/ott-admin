"use client";

import { useActionState } from "react";

import { ArrowPathIcon } from "@heroicons/react/24/solid";
import Button from "@/app/components/button";
import { insertSeries } from "./action";
import Input from "@/app/components/input";

export default function InsertSeries() {
  const [state, action, pending] = useActionState(insertSeries, null);
  return (
    <div className="flex h-dvh w-full flex-col items-center justify-center bg-neutral-900">
      <h3 className="text-3xl font-bold uppercase">Add Series</h3>
      <form action={action} className="mt-5 flex flex-col gap-2">
        <Input id="series_id" name="series_id" placeholder="TMDB SERIES ID" />
        <Button pending={pending} text="Send" />
      </form>
      {state?.errors ? (
        <span className="text-sm text-red-500">
          state.errors.formErrors.join(" ")
        </span>
      ) : null}
    </div>
  );
}

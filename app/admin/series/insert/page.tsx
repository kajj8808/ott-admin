"use client";
import Button from "@/components/button";
import GradientText from "@/components/gradient-text";
import Input from "@/components/input";
import { autoSeriesInsert } from "./actions";
import { useActionState } from "react";

export default function Page() {
  const [state, action] = useActionState(autoSeriesInsert, null);

  return (
    <div className="flex h-dvh w-full flex-col items-center justify-center gap-2">
      <GradientText>
        <h3>Series Insert</h3>
      </GradientText>
      <form action={action} className="flex flex-col gap-2">
        <label htmlFor="tmdb_id" className="text-xs font-medium">
          TMDB ID
        </label>
        <Input name="tmdb_id" id="tmdb_id" placeholder="tmdb id" />
        {state?.errors?.fieldErrors.tmdbId?.map((error, key) => (
          <p key={key} className="text-sm text-red-500">
            {error}
          </p>
        ))}
        <Button text="auto insert series" />
      </form>
    </div>
  );
}

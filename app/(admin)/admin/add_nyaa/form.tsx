"use client";

import { useActionState } from "react";
import { addNyaa, Season } from "./action";
import Input from "@/components/input";
import Button from "@/components/button";
import Form from "@/components/ui/admin-form";

interface NyaaFormProps {
  seasons: Season[];
}

export default function NyaaForm({ seasons }: NyaaFormProps) {
  const [state, action, pending] = useActionState(addNyaa, null);

  return (
    <Form action={action} subTitle="Add Nyaa">
      <select
        name="season_id"
        className="rounded-sm p-3 text-center text-lg font-semibold text-neutral-900"
      >
        {seasons.map((season) => (
          <option key={season.id} value={season.id} className="w-5">
            {season.series.title} {season.name}
          </option>
        ))}
      </select>
      <Input id="nyaa_query" name="nyaa_query" placeholder="nyaa query" />

      <Button text="Send" pending={pending} />
      {state?.errors ? (
        <span className="text-sm text-red-500">
          {state.errors.fieldErrors.nyaaQuery}
        </span>
      ) : null}
    </Form>
  );
}

"use client";

import { useActionState } from "react";
import { addNyaa, Season } from "./action";
import Input from "@/app/components/input";
import Button from "@/app/components/button";
import Form from "@/app/components/ui/admin-form";

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
      <ul>
        <li>
          <input type="checkbox" name="is_db" id="is_db" />
          <span> is db</span>
        </li>
        <li>
          <input type="checkbox" name="is_4k" id="is_4k" />
          <span> is 4k</span>
        </li>
      </ul>

      <Button text="Send" pending={pending} />
      {state?.errors ? (
        <span className="text-sm text-red-500">
          {state.errors.fieldErrors.nyaaQuery}
        </span>
      ) : null}
    </Form>
  );
}

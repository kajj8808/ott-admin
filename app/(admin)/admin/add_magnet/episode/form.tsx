"use client";

import { useActionState } from "react";
import { addMagnet } from "./actions";
import Input from "@/components/input";
import Button from "@/components/button";
import Form from "@/components/ui/admin-form";
import type { Season } from "../../add_nyaa/action";

interface MagnetFormProps {
  seasons: Season[];
}

export default function MagnetForm({ seasons }: MagnetFormProps) {
  const [state, action, pending] = useActionState(addMagnet, null);

  return (
    <div>
      <Form action={action} subTitle="Episode">
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
        <Input id="magnet_url" name="magnet_url" placeholder="Magnet Url" />
        <Button text="Send" pending={pending} />
        {state?.errors ? (
          <span className="text-sm text-red-500">
            {state.errors.fieldErrors.magnetUrl}
          </span>
        ) : null}
      </Form>
    </div>
  );
}

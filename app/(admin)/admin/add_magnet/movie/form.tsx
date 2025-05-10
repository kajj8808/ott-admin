"use client";

import { useActionState } from "react";
import { addMagnet } from "./actions";
import Input from "@/components/input";
import Button from "@/components/button";
import Form from "@/components/ui/admin-form";

interface MagnetFormProps {
  series: {
    id: number;
    title: string;
  }[];
}

export default function MagnetForm({ series }: MagnetFormProps) {
  const [state, action, pending] = useActionState(addMagnet, null);

  return (
    <div>
      <Form action={action} subTitle="Movie">
        <select
          name="series_id"
          className="rounded-sm p-3 text-center text-lg font-semibold text-neutral-900"
        >
          {series.map((series) => (
            <option key={series.id} value={series.id} className="w-5">
              {series.title}
            </option>
          ))}
        </select>
        <Input id="magnet_url" name="magnet_url" placeholder="Magnet Url" />
        <label htmlFor="check_box" className="flex gap-1">
          <input type="checkbox" name="is_include_series" id="check_box" />
          series 포함하지 않음.
        </label>
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

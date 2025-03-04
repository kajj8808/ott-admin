"use client";

import { useActionState } from "react";

import Button from "@/components/button";
import { insertSeries } from "./action";
import Input from "@/components/input";
import Title from "@/components/title";
import Form from "@/components/ui/admin-form";

export default function InsertSeries() {
  const [state, action, pending] = useActionState(insertSeries, null);
  return (
    <div className="flex h-dvh w-full flex-col items-center justify-center bg-neutral-900">
      <Title title="Add Series" />
      <Form action={action} subTitle="Tmdb">
        <Input id="series_id" name="series_id" placeholder="TMDB SERIES ID" />
        <Button pending={pending} text="Send" />
      </Form>
      {state?.errors ? (
        <span className="text-sm text-red-500">
          {state.errors.formErrors.join(" ")}
        </span>
      ) : null}
    </div>
  );
}

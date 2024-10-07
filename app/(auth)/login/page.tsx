"use client";
import Link from "next/link";

import { useFormState } from "react-dom";
import Input from "@/components/input";
import Button from "@/components/button";
import { ArrowRightCircleIcon } from "@heroicons/react/24/outline";
import { login } from "./actions";

export default function CreateAccountPage() {
  const [state, trigger] = useFormState(login, null);
  return (
    <div className="flex w-full max-w-xs flex-col gap-4">
      <h3 className="text-xl font-bold">Log in with email and password.</h3>
      <form className="flex flex-col gap-4" action={trigger}>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-2.5">
            <label htmlFor="email" className="text-xs font-semibold">
              Email *
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="email"
              errors={state?.fieldErrors.email}
            />
          </div>
          <div className="flex flex-col gap-2.5">
            <label htmlFor="email" className="text-xs font-semibold">
              Password *
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="password"
              errors={state?.fieldErrors.password}
            />
          </div>
        </div>
        <Button text="Log in" />
      </form>

      <Link
        href={"/create-account"}
        className="flex size-fit items-center gap-1"
      >
        <span className="relative -top-px">create-account</span>
        <div className="size-5">
          <ArrowRightCircleIcon />
        </div>
      </Link>
    </div>
  );
}

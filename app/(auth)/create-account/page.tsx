"use client";
import Link from "next/link";
import { createAccount } from "./actions";
import { useFormState } from "react-dom";
import Input from "@/components/input";
import Button from "@/components/button";
import { ArrowRightCircleIcon } from "@heroicons/react/24/outline";

export default function CreateAccountPage() {
  const [state, trigger] = useFormState(createAccount, null);

  return (
    <div className="flex w-full max-w-xs flex-col gap-4">
      <h3 className="text-xl font-bold">Fill in the form below to join!</h3>
      <form action={trigger} className="flex flex-col gap-4">
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
        <Button text="Create account" />
      </form>

      <Link href={"/login"} className="flex size-fit items-center gap-1">
        <span className="relative -top-px">login</span>
        <div className="size-5">
          <ArrowRightCircleIcon />
        </div>
      </Link>
    </div>
  );
}

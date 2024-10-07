"use server";

import db from "@/lib/db";
import bcrypt from "bcrypt";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { z } from "zod";
import {
  PASSWORD_MIN_ERROR,
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "@/lib/constants";

const formSchema = z
  .object({
    email: z.string().email().toLowerCase(),
    password: z
      .string()
      .min(PASSWORD_MIN_LENGTH, PASSWORD_MIN_ERROR)
      .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
  })
  .superRefine(async ({ email }, ctx) => {
    const user = await db.user.findUnique({
      where: { email },
      select: {
        id: true,
      },
    });
    if (user) {
      ctx.addIssue({
        code: "custom",
        message: "이 이메일은 이미 사용중입니다.",
        path: ["email"],
        fatal: true,
      });
      return z.NEVER;
    }
  });

export async function createAccount(_: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const result = await formSchema.safeParseAsync(data);

  if (!result.success) {
    return result.error.flatten();
  } else {
    const hashedPassword = bcrypt.hashSync(result.data.password, 12);

    const user = await db.user.create({
      data: {
        email: result.data.email,
        password: hashedPassword,
      },
      select: {
        id: true,
      },
    });
    const session = await getSession();
    session.id = user.id;
    await session.save();

    redirect("/");
  }
}

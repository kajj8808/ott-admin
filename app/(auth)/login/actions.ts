"use server";

import {
  PASSWORD_MIN_ERROR,
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "@/lib/constants";
import db from "@/lib/db";
import { getSession } from "@/lib/session";
import bcrypt from "bcrypt";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email().toLowerCase(),
  password: z
    .string()
    .min(PASSWORD_MIN_LENGTH, PASSWORD_MIN_ERROR)
    .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
});

export async function login(_: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const result = await loginSchema.safeParseAsync(data);

  if (!result.success) {
    return result.error.flatten();
  } else {
    const user = await db.user.findUnique({
      where: {
        email: result.data.email,
      },
      select: {
        id: true,
        password: true,
      },
    });

    const ok = await bcrypt.compare(result.data.password, user?.password ?? "");
    if (ok) {
      const session = await getSession();
      session.id = user?.id;
      await session.save();
    } else {
      return {
        fieldErrors: {
          password: ["wrong password."],
          email: [],
        },
      };
    }
  }
}

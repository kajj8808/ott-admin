import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

interface SessionContent {
  id?: number;
}

export function getSession() {
  return getIronSession<SessionContent>(cookies(), {
    cookieName: "neo-universe",
    password: process.env.COOKIE_PASSWORD!,
  });
}

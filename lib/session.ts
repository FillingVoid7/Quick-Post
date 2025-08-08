import { getIronSession } from "iron-session";
import { cookies } from "next/headers"; 

export const sessionOptions = {
  cookieName: "quick-blogs.session",
  password: process.env.SESSION_SECRET as string,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

// `cookies()` returns a CookieStore
export async function getSession() {
  return getIronSession<{ sid?: string , username?: string }>(await cookies(), sessionOptions);
}

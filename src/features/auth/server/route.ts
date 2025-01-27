import { Hono } from "hono";
import { ID } from "node-appwrite";
import { deleteCookie, setCookie } from "hono/cookie";
import { zValidator } from "@hono/zod-validator";

import { createAdminClient } from "@/lib/appwrite";
import { sessionMiddleware } from "@/lib/session-middleware";

import { AUTH_COOKIE } from "../constants";
import { loginSchema, registerSchema } from "../schemas";

const app = new Hono()
<<<<<<< HEAD
    .get(
        "/current", 
        sessionMiddleware, 
        (c) => {
            const user = c.get("user");
            return c.json({ data: user });
        }
    )
    .post(
        "/login",
        zValidator("json", loginSchema),
        async (c) => {
            
            const { email, password } = c.req.valid("json");
=======
  .get(
    "/current",
    sessionMiddleware,
    (c) => {
      const user = c.get("user");
>>>>>>> temp-branch

      return c.json({ data: user });
    }
  )
  .post(
    "/login",
    zValidator("json", loginSchema),
    async (c) => {
      const { email, password } = c.req.valid("json");

<<<<<<< HEAD
            setCookie(c, AUTH_COOKIE, session.secret, {
                path: "/",
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: 60 * 60 * 24 * 30,
            });
            
            return c.json({ email, password });
        }
    )

    .post(
        "/register",
        zValidator("json", registerSchema),
        async (c) => {
            
            const body = await c.req.json();
            
            const { name, email, password } = c.req.valid("json");
=======
      const { account } = await createAdminClient();
      const session = await account.createEmailPasswordSession(
        email,
        password,
      );

      setCookie(c, AUTH_COOKIE, session.secret, {
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 30,
      });
>>>>>>> temp-branch

      return c.json({ success: true });
    }
  )
  .post(
    "/register",
    zValidator("json", registerSchema),
    async (c) => {
      const { name, email, password } = c.req.valid("json");

      const { account } = await createAdminClient();
      await account.create(
        ID.unique(),
        email,
        password,
        name,
      );

<<<<<<< HEAD
            setCookie(c, AUTH_COOKIE, session.secret, {
                path: "/",
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: 60 * 60 * 24 * 30,
            });
            
            console.log(body);
            
            return c.json({ data: user });
        }
    )
=======
      const session = await account.createEmailPasswordSession(
        email,
        password,
      );
>>>>>>> temp-branch

      setCookie(c, AUTH_COOKIE, session.secret, {
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 30,
      });

      return c.json({ success: true });
    }
  )
  .post("/logout", sessionMiddleware, async (c) => {
    const account = c.get("account");

    deleteCookie(c, AUTH_COOKIE);
    await account.deleteSession("current");

    return c.json({ success: true });
  });

export default app;

import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { loginSchema, registerSchema } from "../schema";

import { createAdminClient } from "@/lib/appwrite";
import { ID } from "node-appwrite";
import { deleteCookie, setCookie } from "hono/cookie";
import { AUTH_COOKIE } from "../constants";

import { sessionMiddleware } from "@/lib/session-middleware";

const app = new Hono()
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
            
            const body = await c.req.json();
            
            const { email, password } = c.req.valid("json");

            const {account} = await createAdminClient();
            const session = await account.createEmailPasswordSession(
                email, 
                password
            );

            setCookie(c, AUTH_COOKIE, session.secret, {
                path: "/",
                httpOnly: true,
                secure: true,
                sameSite: "strict",
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
            
            const { name, email, password, confirmPassword } = c.req.valid("json");

            const {account} = await createAdminClient();
            const user = await account.create(
                ID.unique(),
                email,
                password,
                name
            );

            const session = await account.createEmailPasswordSession(
                email, 
                password
            );

            setCookie(c, AUTH_COOKIE, session.secret, {
                path: "/",
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                maxAge: 60 * 60 * 24 * 30,
            });
            
            console.log(body);
            
            return c.json({ data: user });
        }
    )

    .post(
        "/logout", sessionMiddleware,
        async (c) => {
            const account = c.get("account");
            deleteCookie(c, AUTH_COOKIE);
            await account.deleteSession("current");
            return c.json({ message: "Logged out" });
        }
    );

export default app;

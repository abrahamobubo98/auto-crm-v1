import { Hono } from "hono";
import { handle } from "hono/vercel";

import auth from "@/features/auth/server/route";
import members from "@/features/members/server/route";
import workspaces from "@/features/workspaces/server/route";
import projects from "@/features/projects/server/route";
import tasks from "@/features/tasks/server/route";

const app = new Hono().basePath("/api");

<<<<<<< HEAD
// Configure routes and export type for type safety
=======
// eslint-disable-next-line @typescript-eslint/no-unused-vars
>>>>>>> temp-branch
const routes = app
  .route("/auth", auth)
  .route("/members", members)
  .route("/workspaces", workspaces)
  .route("/projects", projects)
  .route("/tasks", tasks)

<<<<<<< HEAD
=======
export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

>>>>>>> temp-branch
export type AppType = typeof routes;

// Export handlers using the configured routes
export const GET = handle(routes);
export const POST = handle(routes);
export const PATCH = handle(routes);
export const PUT = handle(routes);
export const DELETE = handle(routes);

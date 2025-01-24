import { sessionMiddleware } from "@/lib/session-middleware";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { Query, ID } from "node-appwrite";
import { PROJECTS_ID, DATABASE_ID, IMAGES_BUCKET_ID } from "@/config";
import { getMember } from "@/features/members/utils";
import { createProjectSchema, updateProjectSchema } from "../schemas";

const app = new Hono()
    .get(
        "/", 
        sessionMiddleware,
        zValidator("query", z.object({
            workspaceId: z.string().optional(),
            projectId: z.string().optional(),
        })),
        async (c) => {
            const user = c.get("user");
            const databases = c.get("databases");

            const { workspaceId, projectId } = c.req.valid("query");

            if (projectId) {
                const project = await databases.getDocument(
                    DATABASE_ID,
                    PROJECTS_ID,
                    projectId
                );

                const member = await getMember({
                    databases,
                    workspaceId: project.workspaceId,
                    userId: user.$id,
                });

                if (!member) {
                    return c.json({ error: "Unauthorized" }, 401);
                }

                return c.json({ data: project });
            }

            if (!workspaceId) {
                return c.json({ error: "Workspace ID is required" }, 400);
            }

            const member = await getMember({
                databases, 
                workspaceId,
                userId: user.$id, 
            });

            if (!member) {
                return c.json({ error: "Unauthorized" }, 401);
            }

            const projects = await databases.listDocuments(
                DATABASE_ID,
                PROJECTS_ID,
                [
                    Query.equal("workspaceId", workspaceId),
                    Query.orderDesc("$createdAt")
                ]
            );

            return c.json({ data: projects });
        }
    )
    .post(
        "/",
        sessionMiddleware,
        zValidator("form", createProjectSchema),
        async (c) => {
            const user = c.get("user");
            const databases = c.get("databases");
            const storage = c.get("storage");

            const { name, image, workspaceId } = c.req.valid("form");

            if (!workspaceId) {
                return c.json({ error: "Workspace ID is required" }, 400);
            }

            const member = await getMember({
                databases,
                workspaceId,
                userId: user.$id,
            });

            if (!member) {
                return c.json({ error: "Unauthorized" }, 401);
            }

            let uploadedImageUrl: string | undefined;

            if (image instanceof File) {
                const file = await storage.createFile(
                    IMAGES_BUCKET_ID,
                    ID.unique(),
                    image,
                );

                const arrayBuffer = await storage.getFilePreview(
                    IMAGES_BUCKET_ID,
                    file.$id,
                );

                uploadedImageUrl = `data:image/png;base64,${Buffer.from(arrayBuffer).toString("base64")}`;
            }

            const project = await databases.createDocument(
                DATABASE_ID,
                PROJECTS_ID,
                ID.unique(),
                {
                    name,
                    workspaceId,
                    imageUrl: uploadedImageUrl,
                },
            );

            return c.json({ data: project });
        }
    )
    .patch(
        "/",
        sessionMiddleware,
        zValidator("query", z.object({
            projectId: z.string(),
        })),
        zValidator("form", updateProjectSchema),
        async (c) => {
            const user = c.get("user");
            const databases = c.get("databases");
            const storage = c.get("storage");
            const { projectId } = c.req.valid("query");
            const { name, image } = c.req.valid("form");

            const project = await databases.getDocument(
                DATABASE_ID,
                PROJECTS_ID,
                projectId
            );

            const member = await getMember({
                databases,
                workspaceId: project.workspaceId,
                userId: user.$id,
            });

            if (!member) {
                return c.json({ error: "Unauthorized" }, 401);
            }

            let uploadedImageUrl: string | undefined;

            if (image instanceof File) {
                const file = await storage.createFile(
                    IMAGES_BUCKET_ID,
                    ID.unique(),
                    image,
                );

                const arrayBuffer = await storage.getFilePreview(
                    IMAGES_BUCKET_ID,
                    file.$id,
                );

                uploadedImageUrl = `data:image/png;base64,${Buffer.from(arrayBuffer).toString("base64")}`;
            } else {
                uploadedImageUrl = image;
            }

            const updatedProject = await databases.updateDocument(
                DATABASE_ID,
                PROJECTS_ID,
                projectId,
                {
                    name,
                    imageUrl: uploadedImageUrl,
                },
            );

            return c.json({ data: updatedProject });
        }
    )
    .delete(
        "/",
        sessionMiddleware,
        zValidator("query", z.object({
            projectId: z.string(),
        })),
        async (c) => {
            const user = c.get("user");
            const databases = c.get("databases");
            const { projectId } = c.req.valid("query");

            const project = await databases.getDocument(
                DATABASE_ID,
                PROJECTS_ID,
                projectId
            );

            const member = await getMember({
                databases,
                workspaceId: project.workspaceId,
                userId: user.$id,
            });

            if (!member) {
                return c.json({ error: "Unauthorized" }, 401);
            }

            await databases.deleteDocument(
                DATABASE_ID,
                PROJECTS_ID,
                projectId
            );

            return c.json({ data: { $id: projectId } });
        }
    );

export default app;

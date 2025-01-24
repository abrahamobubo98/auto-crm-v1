import { z } from 'zod';

export const createProjectSchema = z.object({
  name: z.string().min(1, 'Project name is required'),
  image: z.union([
    z.instanceof(File),
    z.string().transform((value)=> value === "" ? undefined : value),
  ]).optional(),
  workspaceId: z.string().min(1, 'Workspace ID is required'),
});

export const updateProjectSchema = z.object({
  name: z.string().min(1, 'Project name is required').optional(),
  image: z.union([
    z.instanceof(File),
    z.string().transform((value)=> value === "" ? undefined : value),
  ]).optional(),
});

export type CreateProjectSchema = z.infer<typeof createProjectSchema>;
export type UpdateProjectSchema = z.infer<typeof updateProjectSchema>; 
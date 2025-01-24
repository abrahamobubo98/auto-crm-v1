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
  name: z.string().min(1, 'Must be at least 1 character long'),
  image: z.union([
    z.instanceof(File),
    z.string().transform((value)=> value === "" ? undefined : value),
  ]).optional(),
}); 
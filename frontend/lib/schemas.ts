// lib/schemas.ts
import { z } from "zod";

export const VirtualBoxSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.enum(["react", "node"]),
  bucket: z.string().nullable(),
  userId: z.string(),
});

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  virtualBox: z.array(VirtualBoxSchema),
});

// lib/schemas.ts
export type User = z.infer<typeof UserSchema>;
export type VirtualBox = z.infer<typeof VirtualBoxSchema>;

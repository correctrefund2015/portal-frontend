import { z } from "zod";

export const businessProfileSchema = z.object({
  legalName: z.string(),
  dba: z.string(),
  ein: z.string().optional(),
  structure: z.string().optional(),
});

export type BusinessProfileFormData = z.infer<typeof businessProfileSchema>;

import * as z from "zod";

// Define Zod schemas for the profile data
export const profileSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  phone: z.string(),
  maritalStatus: z.string().optional(),
  address: z.string().optional(),
  ssn: z
    .string()
    // .regex(/^\d{3}-\d{2}-\d{4}$/, { message: "Invalid SSN format" })
    .optional(),
  dob: z.date().optional(),
  // dob: z
  //   .string()
  //   .transform((v) => new Date(v))
  //   .optional(),
});

export type ProfileFormData = z.infer<typeof profileSchema>;

export const contactSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
});

export const employmentSchema = z.object({
  employer: z.string(),
  jobTitle: z.string(),
  address: z.string(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  type: z.string(),
  startDate: z.date(),
});

export type EmploymentFormData = z.infer<typeof employmentSchema>;

export const financeSchema = z.object({
  incomeType: z.string(),
  taxFillingStatus: z.string(),
  amount: z.coerce.number(),
});

export type FinanceFormData = z.infer<typeof financeSchema>;

export const spouseSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  dob: z.date().optional(),
  ssn: z.string(),
  email: z.string().email(),
  phone: z.string(),
});

export type SpouseFormData = z.infer<typeof spouseSchema>;

export const dependentSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  dob: z.date().optional(),
  ssn: z.string(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  relationship: z.string(),
});

export type DependentFormData = z.infer<typeof dependentSchema>;

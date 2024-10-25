import * as z from "zod";

// Define the Profile interface
export interface ClientProfile {
  type?: "INDIVIDUAL" | "BUSINESS";
  ssn?: string;
  dob?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  address?: string;
  legalName?: string;
  name?: string;
  dba?: string;
  ein?: string;
  structure?: string;
}

// Define the Zod schema for form validation
export const profileSchema = z.object({
  type: z.enum(["INDIVIDUAL", "BUSINESS"]),
  // ssn: z.string().optional(),
  // dob: z
  //   .string()
  //   .optional()
  //   .refine((val) => !val || /^\d{4}-\d{2}-\d{2}$/.test(val), {
  //     message: "Date must be in YYYY-MM-DD format",
  //   }),
  // firstName: z.string().min(1, "First name is required"),
  // lastName: z.string().min(1, "Last name is required"),
  // phone: z.string().optional(),
  // email: z.string().email("Invalid email address"),
  // address: z.string().optional(),
  legalName: z.string(),
  name: z.string().optional(),
  dba: z.string().optional(),
  ein: z.string().optional(),
  structure: z
    .string()
    // .enum([
    //   "NON_PROFIT",
    //   "SINGLE_LLC",
    //   "MULTIPLE_LLC",
    //   "CORPORATION",
    //   "PARTNERSHIP",
    //   "SOLE_PROPRIETORSHIP",
    // ])
    .optional(),
});

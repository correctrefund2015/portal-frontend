import { Prisma } from "@prisma/client";
import { NextRequest } from "next/server";

export function handlePrismaError(error: any, req: NextRequest, res: any) {
  if (error instanceof Prisma.PrismaClientInitializationError) {
    console.error("Database connection failed:", error);
    return res
      .status(500)
      .json({ error: "Database connection error. Please try again later." });
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2024") {
      console.error("Connection pool timeout:", error);
      return res.status(503).json({
        error: "Database is currently unavailable. Please try again later.",
      });
    }
  }

  // Handle other Prisma errors as needed

  console.error("Unhandled Prisma error:", error);
  return res.status(500).json({ error: "An unexpected error occurred" });
}

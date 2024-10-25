import { Prisma } from "@prisma/client";

export async function withRetry(operation: any, maxRetries = 3) {
  let retries = 0;
  while (retries < maxRetries) {
    try {
      return await operation();
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2024"
      ) {
        retries++;
        await new Promise((resolve) => setTimeout(resolve, 1000 * retries)); // Exponential backoff
      } else {
        throw error;
      }
    }
  }
  throw new Error("Max retries reached");
}

// Usage
// const result = await withRetry(() => prisma.yourModel.findMany());

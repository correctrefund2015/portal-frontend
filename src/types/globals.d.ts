export {};

// Create a type for the roles
export type Roles = "EMPLOYEE" | "CLIENT";

declare global {
  interface CustomJwtSessionClaims {
    public_metadata: {
      role?: Roles;
      onboardingComplete?: boolean;
    };
  }
}

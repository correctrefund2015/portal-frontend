import prisma from "../prisma";

export const createIndividualClient = async (data: any) => {
  try {
    const { email, firstName, lastName, phone } = data;

    return prisma.$transaction(
      async (prisma) => {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
          throw new Error(
            "There is no account with this email address. Please signup instead."
          );
        }

        const updatedUser = await prisma.user.update({
          where: { id: user.id },
          data: { onboarding: true, isVerified: true },
        });

        const client = await prisma.client.create({
          data: { userId: user.id },
        });

        const individualProfile = await prisma.individualProfile.create({
          data: {
            email,
            firstName,
            lastName,
            phone,
            clientId: client.id,
          },
        });

        return {
          user: updatedUser,
          client,
          individualProfile,
        };
      },
      {
        maxWait: 5000, // default: 2000
        timeout: 10000, // default: 5000
        // isolationLevel: Prisma.TransactionIsolationLevel.Serializable, // optional, default defined by database configuration
      }
    );
  } catch (error) {
    console.error(error);

    throw new Error("Unable to create client");
  }
};

export const createBusinessClient = async (data: any) => {
  try {
    const { email, legalName, dba, phone, address } = data;

    return prisma.$transaction(
      async (prisma) => {
        const user = await prisma.user.findUnique({
          where: { email },
        });
        if (!user) {
          throw new Error(
            "There is no account with this email address. Please signup instead."
          );
        }

        // update onboarding

        const updatedUser = await prisma.user.update({
          where: { id: user.id },
          data: { onboarding: true, isVerified: true },
        });

        // Create Client
        const client = await prisma.client.create({
          data: {
            userId: user.id,
          },
        });

        // Create BusinessProfile
        const businessProfile = await prisma.businessProfile.create({
          data: {
            email,
            legalName,
            dba,
            address,
            phone,
            clientId: client.id,
          },
        });

        return {
          user: updatedUser,
          client,
          businessProfile,
        };
      },
      {
        maxWait: 5000, // default: 2000
        timeout: 10000, // default: 5000
        // isolationLevel: Prisma.TransactionIsolationLevel.Serializable, // optional, default defined by database configuration
      }
    );
  } catch (error) {
    console.error(error);
    throw new Error("Unable to create client");
  }
};

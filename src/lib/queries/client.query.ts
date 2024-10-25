import { BusinessStructure } from "@prisma/client";
import prisma from "../prisma";

// clients

export const createBusinessProfileQuery = async (
  clientId: string,
  data: any
) => {
  const { type, legalName, structure, dba, address, phone } = data;

  const businessStructure = String(structure).replaceAll(
    " ",
    "_"
  ) as BusinessStructure;

  try {
    const client = await prisma.client.findUnique({
      where: { id: clientId },
    });
    if (!client) {
      throw new Error(`Client with ID ${clientId} not found`);
    }

    const resp = await prisma.businessProfile.create({
      data: {
        legalName,
        dba,
        // email,
        address,
        phone,
        structure: businessStructure,
        clientId: clientId,
      },
    });

    return { data: resp };
  } catch (error) {
    console.error(error);
    throw new Error("Unable to create profile");
  }
};
export const getClientProfilesFromDb = async (clientId: string) => {
  try {
    const client = await prisma.client.findUnique({
      where: { id: clientId },
    });
    if (!client) {
      throw new Error(`Client with ID ${clientId} not found`);
    }

    const profiles = await prisma.client.findUnique({
      where: { id: clientId },

      include: {
        individualProfile: true,
        businessProfiles: true,
        // serviceRequests: true,
      },
    });

    return profiles;
  } catch (error) {
    console.error(error);

    return null;
  }
};

export const getIndividualProfileById = async (profileId: string) => {
  try {
    if (!profileId) {
      throw new Error(`Client with ID ${profileId} not found`);
    }

    const profile = await prisma.individualProfile.findUnique({
      where: { id: profileId },
      include: {
        dependents: true,
        spouse: true,
        finances: true,
        employment: true,
      },
    });

    return profile;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getBusinessProfilesById = async (clientId: string) => {
  try {
    if (!clientId) {
      throw new Error(`Client with ID ${clientId} not found`);
    }

    const profiles = await prisma.businessProfile.findUnique({
      where: { id: clientId },
    });

    return profiles;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// edit

export const editIndividualProfileQuery = async (
  userId: string,
  profileId: string,
  data: any
) => {
  try {
    if (!profileId || !userId) {
      throw new Error("profileId or userId is not available");
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const profile = await prisma.individualProfile.findUnique({
      where: { id: profileId },
    });

    if (!profile) {
      throw new Error("Individual profile not found");
    }

    const { firstName, lastName, phone, address, ssn, dob, maritalStatus } =
      data;

    // update
    return await prisma.$transaction(async (transaction) => {
      const updatedUser = await transaction.user.update({
        where: { id: userId },
        data: { firstName, lastName, phone },
      });

      const updatedClient = await transaction.individualProfile.update({
        where: { id: profileId },
        data: { firstName, lastName, phone, address, ssn, dob, maritalStatus },
      });

      return { updatedUser, updatedClient };
    });
  } catch (error) {
    throw error;
  }
};

export const editBusinessProfileQuery = async (
  profileId: string,
  data: any
) => {
  const { legalName, structure, dba, address, phone } = data;

  const businessStructure = String(structure).replaceAll(
    " ",
    "_"
  ) as BusinessStructure;

  try {
    const profile = await prisma.businessProfile.findUnique({
      where: { id: profileId },
    });
    if (!profile) {
      throw new Error(`Business with ID ${profileId} not found`);
    }

    const resp = await prisma.businessProfile.update({
      where: { id: profileId },

      data: {
        legalName,
        dba,
        // email,
        address,
        phone,
        structure: businessStructure,
      },
    });

    return { data: resp };
  } catch (error) {
    console.error(error);
    throw new Error("Unable to create profile");
  }
};

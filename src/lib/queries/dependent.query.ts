import prisma from "../prisma";

export const addDependentQuery = async (profileId: string, data: any) => {
  try {
    const { firstName, lastName, gender, dob, ssn, relationship } = data;

    const profile = await prisma.individualProfile.findUnique({
      where: { id: profileId },
    });

    if (!profile) {
      throw new Error(`Client with ID ${profileId} not found`);
    }

    const resp = await prisma.dependent.create({
      data: {
        firstName,
        lastName,
        gender,
        dob,
        ssn,
        relationship,
        individualProfile: { connect: { id: profileId } },
      },
    });
    return { data: resp };
  } catch (error) {
    console.error(error);
    throw new Error("Unable to create dependent");
  }
};

export const editDependentQuery = async (id: string, data: any) => {
  try {
    const dependent = await prisma.dependent.findUnique({ where: { id } });
    if (!dependent) {
      throw new Error(`Dependent with ID ${id} not found`);
    }

    const updated = await prisma.dependent.update({
      where: { id: dependent.id },
      data: data,
    });

    return { data: updated };
  } catch (error) {
    console.error(error);
    throw new Error("Unable to update dependent");
  }
};

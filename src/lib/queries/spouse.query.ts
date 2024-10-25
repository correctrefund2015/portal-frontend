import prisma from "../prisma";

export const addSpouseQuery = async (profileId: string, data: any) => {
  try {
    const { firstName, lastName, email, dob, ssn, phone } = data;

    const profile = await prisma.individualProfile.findUnique({
      where: { id: profileId },
    });

    if (!profile) {
      throw new Error(`Client with ID ${profileId} not found`);
    }

    const resp = await prisma.spouse.create({
      data: {
        firstName,
        lastName,
        dob,
        ssn,
        email,
        phone,
        individualProfile: { connect: { id: profileId } },
      },
    });
    return { data: resp };
  } catch (error) {
    console.error(error);
    throw new Error("Unable to create spouse");
  }
};

export const editSpouseQuery = async (id: string, data: any) => {
  try {
    const spouse = await prisma.spouse.findUnique({ where: { id } });
    if (!spouse) {
      throw new Error(`Spouse with ID ${id} not found`);
    }

    const updated = await prisma.spouse.update({
      where: { id: spouse.id },
      data: data,
    });

    return { data: updated };
  } catch (error) {
    console.error(error);
    throw new Error("Unable to update dependent");
  }
};

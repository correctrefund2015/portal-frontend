import prisma from "../prisma";

export const addEmploymentQuery = async (profileId: string, data: any) => {
  try {
    const { employer, jobTitle, address, startDate, email, phone, type } = data;

    const profile = await prisma.individualProfile.findUnique({
      where: { id: profileId },
    });

    if (!profile) {
      throw new Error(`Client with ID ${profileId} not found`);
    }

    const resp = await prisma.employment.create({
      data: {
        employer,
        jobTitle,
        address,
        startDate,
        email,
        phone,
        type,
        individualProfile: { connect: { id: profileId } },
      },
    });
    return { data: resp };
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const editEmploymentQuery = async (id: string, data: any) => {
  try {
    const employment = await prisma.employment.findUnique({
      where: { id },
    });
    if (!employment) {
      throw new Error(`employment with ID ${id} not found`);
    }

    const updated = await prisma.employment.update({
      where: { id: employment.id },
      data: data,
    });

    return { data: updated };
  } catch (error) {
    console.error(error);
    throw new Error("Unable to update dependent");
  }
};

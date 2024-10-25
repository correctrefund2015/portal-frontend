import prisma from "../prisma";
export const addFinanceQuery = async (profileId: string, data: any) => {
  try {
    const { amount, incomeType, taxFillingStatus } = data;

    const profile = await prisma.individualProfile.findUnique({
      where: { id: profileId },
    });

    if (!profile) {
      throw new Error(`Client with ID ${profileId} not found`);
    }

    const resp = await prisma.finance.create({
      data: {
        amount,
        taxFillingStatus,
        incomeType,
        individualProfile: { connect: { id: profileId } },
      },
    });

    return { data: resp };
  } catch (error) {
    console.error(error);
    throw new Error("Unable to create finance");
  }
};

export const editFinanceQuery = async (id: string, data: any) => {
  try {
    const finance = await prisma.finance.findUnique({
      where: { id },
    });
    if (!finance) {
      throw new Error(`Finance with ID ${id} not found`);
    }

    const updated = await prisma.finance.update({
      where: { id: finance.id },
      data: data,
    });

    return { data: updated };
  } catch (error) {
    console.error(error);
    throw new Error("Unable to update finance");
  }
};

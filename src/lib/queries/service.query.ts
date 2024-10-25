import { ServiceRequestStatus } from "@prisma/client";
import prisma from "../prisma";
import { getUser } from "../session";

export const createServiceQuery = async (
  name: string,
  clientId: string,
  individualProfileId?: string,
  businessProfileId?: string
) => {
  try {
    if (!clientId) {
      throw new Error("Client id not found");
    }

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    // Check if the user has made the same request in the current calendar year
    // const existingRequest = await prisma.serviceRequest.findFirst({
    //   where: {
    //     name: name,
    //     clientId: clientId,
    //     createdAt: {
    //       gte: new Date(currentYear, 0, 1), // January 1st of the current year
    //       lt: new Date(currentYear + 1, 0, 1), // January 1st of the next year
    //     },
    //   },
    // });

    // if (existingRequest) {
    //   throw new Error(
    //     "You cannot make the same service request more than once in a calendar year."
    //   );
    // }

    return await prisma.serviceRequest.create({
      data: {
        name,
        status: "PENDING",
        progress: "Collecting your documents",
        clientId,
        individualProfileId,
        businessProfileId,
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error("Could not create service");
  }
};

export const getServiceRequestListQuery = async (clientId: string) => {
  // const user = await getUser();

  // const clientId = user?.client?.id!;
  try {
    if (!clientId) {
      throw new Error("Client id not found");
    }

    return await prisma.serviceRequest.findMany({
      where: { clientId },
      include: {
        client: true,
        // documents: true
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error("Could not find services");
  }
};

// stats

export const getServiceStatsPerClientQuery = async (clientId: string) => {
  try {
    const statusCounts = await prisma.serviceRequest.groupBy({
      by: ["status"],
      where: {
        clientId: clientId,
      },
      _count: {
        status: true,
      },
    });

    // Create a map to store counts, initialized with all statuses set to 0
    const countsMap = Object.values(ServiceRequestStatus).reduce(
      (acc: any, status: any) => {
        acc[status] = 0;
        return acc;
      },
      {} as Record<ServiceRequestStatus, number>
    );

    // Update the counts with the actual results from the database
    statusCounts.forEach((count) => {
      countsMap[count.status as ServiceRequestStatus] = count._count.status;
    });

    // Convert the map to an array of objects
    return Object.entries(countsMap).map(([status, count]) => ({
      status,
      count,
    }));
  } catch (error) {
    console.error(error);
    throw new Error("Could not get client's stats");
  }
};

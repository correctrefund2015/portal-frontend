import {
  DependentFormData,
  EmploymentFormData,
  FinanceFormData,
  SpouseFormData,
} from "@/schemas/individual-client";
import axios from "axios";

// const API_URL = `${process.env.HOST}/api`;
const API_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/client-profiles`;
const CLIENT_API_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/clients`;
const DEPENDENT_API_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/dependent`;
const FINANCE_API_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/finance`;
const SPOUSE_API_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/spouse`;
const JOB_API_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/employment`;

export const getClientProfile = async (clientId: string, type: string) => {
  try {
    if (!clientId || !type) {
      throw new Error("ClientId or type is not available");
    }
    const response = await axios.get(
      `${CLIENT_API_URL}/${type.toLowerCase()}/${clientId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editClientProfile = async (
  userId: string,
  clientId: string,
  type: string,
  data: any
) => {
  try {
    if (!clientId || !type || !userId) {
      throw new Error("ClientId or type or userId is not available");
    }
    const response = await axios.put(
      `${CLIENT_API_URL}/${type.toLowerCase()}/${clientId}`,
      {
        userId,
        data,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
/**
 *
 * @param profileId
 * @param data
 * @returns
 */
export const addDependent = async (
  profileId: string,
  data: DependentFormData
) => {
  try {
    if (!profileId) {
      throw new Error("ClientId or type or userId is not available");
    }
    const response = await axios.post(`${DEPENDENT_API_URL}`, {
      id: profileId,
      data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editDependent = async (id: string, data: DependentFormData) => {
  try {
    if (!id) {
      throw new Error("ClientId or type or userId is not available");
    }
    const response = await axios.put(`${DEPENDENT_API_URL}/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 *
 * @param profileId
 * @param data
 * @returns
 */
export const addFinance = async (profileId: string, data: FinanceFormData) => {
  try {
    if (!profileId) {
      throw new Error("ClientId or type or userId is not available");
    }
    const response = await axios.post(`${FINANCE_API_URL}`, {
      id: profileId,
      data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editFinance = async (id: string, data: FinanceFormData) => {
  try {
    if (!id) {
      throw new Error("ClientId or type or userId is not available");
    }
    const response = await axios.put(`${FINANCE_API_URL}/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addSpouse = async (profileId: string, data: SpouseFormData) => {
  try {
    if (!profileId) {
      throw new Error("ClientId or type or userId is not available");
    }
    const response = await axios.post(`${SPOUSE_API_URL}`, {
      id: profileId,
      data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editSpouse = async (id: string, data: SpouseFormData) => {
  try {
    if (!id) {
      throw new Error("ClientId or type or userId is not available");
    }
    const response = await axios.put(`${SPOUSE_API_URL}/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addEmployment = async (
  profileId: string,
  data: EmploymentFormData
) => {
  try {
    if (!profileId) {
      throw new Error("ClientId or type or userId is not available");
    }
    const response = await axios.post(`${JOB_API_URL}`, {
      id: profileId,
      data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editEmployment = async (id: string, data: EmploymentFormData) => {
  try {
    if (!id) {
      throw new Error("ClientId or type or userId is not available");
    }
    const response = await axios.put(`${JOB_API_URL}/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getClientProfilesRequest = async (clientId: string) => {
  try {
    if (!clientId) {
      throw new Error("ClientId is not available");
    }
    const response = await axios.get(`${API_URL}/all/${clientId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createClientProfileRequest = async (
  clientId: string,
  profile: any
) => {
  try {
    if (!clientId) {
      throw new Error("ClientId is not available");
    }
    const response = await axios.post(`${API_URL}`, {
      clientId,
      createClientProfileDto: profile,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

import { UserAccount } from "@/contexts/AuthContext";
import axios from "axios";

// const API_URL = `${process.env.HOST}/api`;
const API_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api`;

export const signUp = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  phone: string
) => {
  const response = await axios.post(`${API_URL}/auth/register`, {
    email,
    password,
    firstName,
    lastName,
    phone,
    role: "CLIENT",
  });
  return response.data;
};

export const resendOTP = async (email: string) => {
  const response = await axios.post(`${API_URL}/auth/resend-otp`, {
    email,
  });
  return response.data;
};

export const verifyOTP = async (email: string, otp: string) => {
  const response = await axios.post(`${API_URL}/auth/verify`, {
    email,
    otp,
  });
  return response.data;
};

export const signIn = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const refreshToken = async (refreshToken: string) => {
  const response = await axios.post(`${API_URL}/auth/refresh`, {
    refreshToken,
  });
  return response.data;
};

export const verifyGoogleUser = async (token: string) => {
  const response = await axios.get(`${API_URL}/auth/google/verify/${token}`);
  return response.data;
};

export const createClient = async (
  user: UserAccount,
  type: string,
  serviceName: string,
  businessName: string
) => {
  const { email, firstName, lastName, phone } = user;
  const profile =
    type === "INDIVIDUAL"
      ? {
          email,
          firstName,
          lastName,
          phone,
          serviceName,
        }
      : {
          name: firstName + " " + lastName,
          legalName: businessName,
          dba: "",
          email,
          phone,
          serviceName,
        };
  const response = await axios.post(
    `${API_URL}/clients/${type.toLowerCase()}`,
    profile

    // this wil instead return a
  );

  // const serviceResponse = await axios.post(`${API_URL}/service-request`, {
  //   name: serviceName,
  //   status: "pending",
  //   clientId: response.data.client.id,
  //   clientProfileId: response.data.clientProfile.id,
  // });

  return response.data;
};

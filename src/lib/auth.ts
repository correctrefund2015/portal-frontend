import api, { apiCall } from "./api";

export const loginRequest = async (email: string, password: string) => {
  try {
    const response = await apiCall("post", "/auth/login", { email, password });
    const { accessToken } = response.data as any;

    api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

    return response.data;
  } catch (error) {
    console.error("Error loging:", error);
    throw error;
  }
};

export const registerRequest = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  phone: string
) => {
  try {
    const response = await apiCall<any>("post", `/auth/register`, {
      email,
      password,
      firstName,
      lastName,
      phone,
      role: "CLIENT",
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching:", error);
    throw error;
  }
  // const response = await api.post("/auth/register", {
  //   email,
  //   password,
  //   firstName,
  //   lastName,
  //   phone,
  //   role: "CLIENT",
  // });
  // return response;
};

// export const registerRequest = async (
//   email: string,
//   password: string,
//   firstName: string,
//   lastName: string,
//   phone: string
// ) => {
//   try {
//     const response = await api.post("/auth/register", {
//       email,
//       password,
//       firstName,
//       lastName,
//       phone,
//       role: "CLIENT",
//     });
//     return response;
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.log("status===>", error.status);
//       console.error("response===>", error.response);
//       // Do something with this error...
//     } else {
//       console.error("other error==>", error);
//     }
//     return {
//       status: 500,
//       message: error,
//       data: {
//         message: "Cannot sign up",
//       },
//     };
//   }
// };

export const verifyOtpRequest = async (email: string, otp: string) => {
  try {
    const response = await apiCall<any>("post", "/auth/verify", {
      email,
      otp,
    });
    const { accessToken } = response.data;

    api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

    return response.data;
  } catch (error: any) {
    // if (axios.isAxiosError(error)) {
    //   console.log(error.status);
    //   console.error(error.response);
    //   // Do something with this error...
    // } else {
    //   console.error(error);
    // }
    // return {
    //   status: 500,
    //   message: error,
    //   data: {
    //     message: "Could not verify account",
    //   },
    // };
    console.log("otp error===>", error.message);
    throw error;
  }
};

export const resendOtpRequest = async (email: string, otp: string) => {
  try {
    const response = await apiCall("post", "/auth/resend-otp", {
      email,
      otp,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

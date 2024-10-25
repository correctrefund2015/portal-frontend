// import { auth } from "@/auth";
// import { apiCall } from "../api";

// export const getUserProfile = async () => {
//   const session = await auth();
//   try {
//     if (session?.user) {
//       const response = await apiCall(
//         "get",
//         `/users/profile/${session?.user.id}`
//       );

//       return response.data;
//     }
//   } catch (error) {
//     console.error("Error loging:", error);
//     throw error;
//   }
// };

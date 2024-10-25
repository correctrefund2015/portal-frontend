// "use client";
// import { useRouter, useSearchParams } from "next/navigation";
// import React, { useEffect } from "react";

// const GoogleLogin = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const login = async (accessToken: string, refreshToken: string) => {
//     const resp = await fetch("/api/google-login", {
//       method: "GET",
//       body: JSON.stringify({ accessToken, refreshToken }),
//     });
//     console.log('in google login');

//     return resp.ok ? resp.json() : null;
//   };

//   useEffect(() => {
//     const accessToken = searchParams.get("redirect");
//     const refreshToken = searchParams.get("token");
//     if (accessToken && refreshToken) {
//       login(accessToken, refreshToken).then((data: any) => {
//         if (data.message === "ok") {
//           // console.log({ data });

//           router.replace(data.route);
//           router.refresh();
//         }
//       });
//     }
//   }, [router, searchParams]);

//   return <div>Processing authentication...</div>;
// };

// export default GoogleLogin;

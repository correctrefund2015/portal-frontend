// function GoogleLogin() {
//   const searchParams = useSearchParams();

//   const token = searchParams.get("redirect");
//   const isNewUser = searchParams.get("newUser");
//   const onboarding = searchParams.get("onboarding");

//   const router = useRouter();
//   const redirectGoogleUser = async () => {
//     console.log("redirect");

//     if (token !== null && isNewUser !== null && onboarding !== null) {
//       const resp = await fetch("/api/google-login", {
//         method: "POST",
//         body: JSON.stringify({
//           token,
//           isNewUser,
//           onboarding,
//         }),
//       });

//       const json = await resp.json();
//       console.log(json);

//       if (json.message === "ok") {
//         router.replace(json.route);
//       }
//     }
//   };
//   useEffect(() => {
//     redirectGoogleUser();
//   }, [searchParams]);

//   console.log(token, isNewUser);

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center">
//       <LoadingImage size={150} />
//     </div>
//   );
// }
export default function Home() {
  return <></>;
}

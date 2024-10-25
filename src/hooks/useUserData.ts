import { apiCall } from "@/lib/api";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export const useUserData = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const { user: clerkUser } = useUser();

  useEffect(() => {
    console.log("clerk session ", clerkUser?.id);

    if (clerkUser) {
      // fetch user profile
      apiCall("get", `/auth/me/${clerkUser.id}`).then((response) => {
        console.log(response.data);

        setUser(response.data as IUser);
      });
    }
  }, []);

  return { user };
};

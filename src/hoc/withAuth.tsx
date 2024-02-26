"use client";
import customAxios from "@/api/axios.custom";
import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { setAccessToken } from "@/redux/app.slice";

const withAuth = (Component: () => JSX.Element) => {
  return () => {
    const router = useRouter();
    const dispatch = useDispatch();

    useLayoutEffect(() => {
      const refreshTokens = async () => {
        try {
          const res = await customAxios.get("auth/refresh/admin", {
            withCredentials: true,
          });
          dispatch(setAccessToken(res.data.access_token));
        } catch (error) {
          console.error({ error });
          router.replace("/login");
        }
      };

      refreshTokens();
    }, []);

    return <Component />;
  };
};

export default withAuth;

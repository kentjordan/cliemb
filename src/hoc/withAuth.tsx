"use client";
import customAxios from "@/api/axios.custom";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAccessToken } from "@/redux/app.slice";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const withAuth = (Component: () => JSX.Element) => {
  return () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { access_token } = useSelector((state: RootState) => state.appReducer);

    useEffect(() => {
      // TODO: Refresh the token first
      // If successfully refreshed, proceed to the auth'd routes

      const refreshTokens = async () => {
        try {
          const res = await customAxios.get("auth/refresh", {
            withCredentials: true,
          });
          dispatch(setAccessToken(res.data.access_token));
        } catch (error) {
          console.error({ error });
          router.replace("/login");
        }
      };

      if (!access_token) refreshTokens();
    }, []);

    return <Component />;
  };
};

export default withAuth;

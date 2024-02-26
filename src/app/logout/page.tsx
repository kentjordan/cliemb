"use client";
import customAxios from "@/api/axios.custom";
import withAuth from "@/hoc/withAuth";
import useAppState from "@/hooks/useAppState";
import { useRouter } from "next/navigation";
import React, { useLayoutEffect } from "react";

const LogoutPage = () => {
  const { access_token } = useAppState();

  const router = useRouter();

  useLayoutEffect(() => {
    const logout = async () => {
      await customAxios.post("auth/logout/admin", null, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${access_token}` },
      });
      router.replace("/login");
    };
    if (access_token) logout();
  }, [access_token]);

  return <div></div>;
};

export default withAuth(LogoutPage);

"use client";

import withAuth from "@/hoc/withAuth";
import useAppState from "@/hooks/useAppState";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect } from "react";

const Home = () => {
  const router = useRouter();

  const { access_token } = useAppState();

  useEffect(() => {
    if (access_token) router.replace("/dashboard");
    if (!access_token) router.replace("/login");
  }, [access_token]);

  return <div></div>;
};

export default withAuth(Home);

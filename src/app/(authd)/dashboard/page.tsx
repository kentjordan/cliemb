"use client";
import withAuth from "@/hoc/withAuth";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Link from "next/link";

const DashboardPage = () => {
  const { access_token } = useSelector((state: RootState) => state.appReducer);

  return (
    <div className="flex w-full items-center justify-center">
      <div className="flex flex-col gap-4">
        <Link href="/dashboard/cit-department">CIT Department</Link>
        <Link href="/dashboard/emergency-hotlines">Emergency Hotlines</Link>
        <Link href="/dashboard/monitoring-system">Monitoring System</Link>
      </div>
    </div>
  );
};

export default withAuth(DashboardPage);

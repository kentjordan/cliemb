"use client";
import withAuth from "@/hoc/withAuth";
import Link from "next/link";
import ic_cit from "@/assets/ic_cit.png";
import ic_emergency_hotlines from "@/assets/ic_emergency_hotlines.png";
import ic_monitoring_system from "@/assets/ic_monitoring_system.png";
import Image from "next/image";

const DashboardPage = () => {
  return (
    <div className="flex w-full items-center justify-center bg-white p-4">
      <div className="flex flex-col gap-y-10">
        <Link className="flex items-center" href="/dashboard/cet-department">
          <Image src={ic_cit} alt="" width={150} height={150} />
          <p className="w-80 bg-red-700 p-8 text-2xl text-white">User Profile</p>
        </Link>
        <Link className="flex items-center" href="/dashboard/emergency-hotlines">
          <Image src={ic_emergency_hotlines} alt="" width={150} height={150} />
          <p className="w-80 bg-red-700 p-8 text-2xl text-white">Emergency Hotlines</p>
        </Link>
        <Link className="flex items-center" href="/dashboard/monitoring-system">
          <Image src={ic_monitoring_system} alt="" width={150} height={150} />
          <p className="w-80 bg-red-700 p-8 text-2xl text-white">Monitoring System</p>
        </Link>
      </div>
    </div>
  );
};

export default withAuth(DashboardPage);

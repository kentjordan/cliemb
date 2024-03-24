import customAxios from "@/api/axios.custom";
import withAuth from "@/hoc/withAuth";
import useAppState from "@/hooks/useAppState";
import IAdminInfo from "@/types/IAdminInfo";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const { access_token } = useAppState();

  const [admin, setAdmin] = useState<IAdminInfo | null>(null);

  useEffect(() => {
    const getUserInfo = async () => {
      const res = await customAxios.get("admins", { headers: { Authorization: `Bearer ${access_token}` } });
      if (res.status === 200) {
        setAdmin(res.data);
      }
    };

    if (access_token) getUserInfo();
  }, [access_token]);

  return (
    <div className="h-screen min-w-56 bg-[#1F2122]">
      <div className="flex">
        <div className="mx-2 my-6 flex">
          {admin?.profile_photo ? (
            <Image src={admin?.profile_photo} width={50} height={50} alt="Admin's profile photo" className="m-4 rounded-full" />
          ) : (
            <div className="m-4 h-[50px] w-[50px] rounded-full bg-white"></div>
          )}
          <div className="ml-2 flex flex-col justify-center text-white">
            <span className="text-base font-bold">
              {admin?.first_name} {admin?.last_name}
            </span>
            <span className="mt-2 text-xs">{admin?.position.toUpperCase()}</span>
          </div>
        </div>
      </div>
      <div className="bg-black">
        <div className="mx-8 flex">
          <ul className="my-8 flex flex-col gap-6 text-white">
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link href="/admin-log">Admin&apos;s Log</Link>
            </li>
            <li>
              <Link href="/profile">Profile</Link>
            </li>
            <li>
              <Link href="/logout">Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default withAuth(Sidebar);

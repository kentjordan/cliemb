import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="h-full w-fit bg-[#1F2122]">
      <div className="flex">
        <div className="mx-8 my-6 flex">
          <div className="mr-2 h-16 w-16 rounded-full bg-white"></div>
          <div className="ml-2 flex flex-col justify-center text-white">
            <span className="text-lg font-bold">Alona</span>
            <span className="text-xs">Nurse II</span>
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
              <Link href="/admin-log">Admin's Log</Link>
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

export default Sidebar;

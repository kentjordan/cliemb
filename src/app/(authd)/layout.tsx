"use client";
import Sidebar from "@/components/authd/sidebar";
import Image from "next/image";
import CLIEMBLogo from "@/assets/cliemb.png";
import { Provider } from "react-redux";
import store from "@/redux/store";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className="h-screen">
        <Provider store={store}>
          <div className="flex flex-col">
            {/* Top Bar */}
            <div className="mt-2 flex w-full items-center justify-between">
              <Image className="absolute" quality={100} src={CLIEMBLogo} width={256} alt="CLIEMB Logo" />
              <div className="flex h-fit w-full items-center justify-end bg-[#6B0900] p-3">
                <h1 className="text-xl font-bold text-white">Clinic Monitoring System</h1>
              </div>
            </div>
            <div className="flex h-full w-full bg-[#1F2122]">
              <Sidebar />
              <div className="flex flex-1">{children}</div>
            </div>
          </div>
        </Provider>
      </body>
    </html>
  );
};

export default DashboardLayout;

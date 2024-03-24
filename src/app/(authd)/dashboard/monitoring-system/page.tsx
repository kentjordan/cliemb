"use client";
import CompletedTable from "@/components/monitoring/completedTable";
import ReceivePendingTable from "@/components/monitoring/receivePendingTable";
import withAuth from "@/hoc/withAuth";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { io } from "socket.io-client";

const socket = io(
  `${process.env.NODE_ENV === "production" ? "cliemb.online/api/emergency" : "http://localhost:5001/ws/emergency"}`,
);

const MonitoringSystemPage = () => {
  const [activeTab, setActiveTab] = useState<"RECEIVE" | "PENDING" | "COMPLETED">("RECEIVE");
  const router = useRouter();

  const [query, setQuery] = useState<any>("");
  const timer = useRef<any>(null);

  return (
    <div className="flex flex-1 flex-col overflow-y-auto bg-white p-4">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex">
          <h1 onClick={() => router.replace("/dashboard")} className="cursor-pointer text-xl">
            Dashboard
          </h1>
          <h1 className="mx-4 text-xl">/</h1>
          <h1 className="text-xl font-bold">Monitoring System</h1>
        </div>
        <input
          onChange={(event) => {
            clearTimeout(timer.current);
            timer.current = setTimeout(() => setQuery(event?.target.value), 200);
          }}
          className="border p-1 text-sm"
          type="text"
          name="seach_admin"
          id="seach_admin"
          placeholder="Search names"
        />
      </div>
      <div className="my-2 flex justify-around border-b border-t py-2">
        <button
          onClick={() => setActiveTab("RECEIVE")}
          className={`flex cursor-pointer items-center rounded px-3 py-2 ${activeTab === "RECEIVE" ? "bg-red-700 text-white" : "bg-transparent text-black"}`}
        >
          <span className="font-bold">RECEIVE / PENDING</span>
        </button>
        <button
          onClick={() => setActiveTab("COMPLETED")}
          className={`flex cursor-pointer items-center rounded px-3 py-2 ${activeTab === "COMPLETED" ? "bg-red-700 text-white" : "bg-transparent text-black"}`}
        >
          <span className="font-bold">COMPLETED</span>
        </button>
      </div>
      {activeTab === "RECEIVE" && <ReceivePendingTable socket={socket} query={query} />}
      {activeTab === "COMPLETED" && <CompletedTable socket={socket} query={query} />}
    </div>
  );
};

export default withAuth(MonitoringSystemPage);

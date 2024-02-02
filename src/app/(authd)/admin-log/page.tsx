"use client";
import { useState } from "react";

const AdminsLog = () => {
  const [data, setData] = useState<
    {
      name: string;
      date: string;
      time_in: string;
      time_out: string;
      position: string;
      no_of_cases: string;
    }[]
  >([
    {
      name: "Alone J. Ante, RN",
      date: "10-08-23",
      time_in: "8:30 AM",
      time_out: "5:03 PM",
      position: "Nurse I",
      no_of_cases: "8",
    },
    {
      name: "Alone J. Ante, RN",
      date: "10-08-23",
      time_in: "8:30 AM",
      time_out: "5:03 PM",
      position: "Nurse I",
      no_of_cases: "8",
    },
    {
      name: "Alone J. Ante, RN",
      date: "10-08-23",
      time_in: "8:30 AM",
      time_out: "5:03 PM",
      position: "Nurse I",
      no_of_cases: "8",
    },
    {
      name: "Alone J. Ante, RN",
      date: "10-08-23",
      time_in: "8:30 AM",
      time_out: "5:03 PM",
      position: "Nurse I",
      no_of_cases: "8",
    },
    {
      name: "Alone J. Ante, RN",
      date: "10-08-23",
      time_in: "8:30 AM",
      time_out: "5:03 PM",
      position: "Nurse I",
      no_of_cases: "8",
    },
    {
      name: "Alone J. Ante, RN",
      date: "10-08-23",
      time_in: "8:30 AM",
      time_out: "5:03 PM",
      position: "Nurse I",
      no_of_cases: "8",
    },
    {
      name: "Alone J. Ante, RN",
      date: "10-08-23",
      time_in: "8:30 AM",
      time_out: "5:03 PM",
      position: "Nurse I",
      no_of_cases: "8",
    },
    {
      name: "Alone J. Ante, RN",
      date: "10-08-23",
      time_in: "8:30 AM",
      time_out: "5:03 PM",
      position: "Nurse I",
      no_of_cases: "8",
    },
    {
      name: "Alone J. Ante, RN",
      date: "10-08-23",
      time_in: "8:30 AM",
      time_out: "5:03 PM",
      position: "Nurse I",
      no_of_cases: "8",
    },
  ]);

  return (
    <div className="h-full w-full overflow-y-auto p-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="font-bold">Admin's Log</h1>
        <input className="border p-1 text-sm" type="text" name="seach_admin" id="seach_admin" placeholder="Search admin" />
      </div>
      <table className="w-full">
        <thead className="bg-black text-white">
          <tr>
            <th className="py-2">Name</th>
            <th>Date</th>
            <th>Time In</th>
            <th>Time Out</th>
            <th>Position</th>
            <th>No. of Cases</th>
          </tr>
        </thead>
        <tbody>
          {data.map((e, i) => {
            return (
              <tr>
                <td className="py-3 text-center">{e.name}</td>
                <td className="py-3 text-center">{e.date}</td>
                <td className="py-3 text-center">{e.time_in}</td>
                <td className="py-3 text-center">{e.time_out}</td>
                <td className="py-3 text-center">{e.position}</td>
                <td className="py-3 text-center">{e.no_of_cases}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AdminsLog;

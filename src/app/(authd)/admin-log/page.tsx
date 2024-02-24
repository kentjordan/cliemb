"use client";

import customAxios from "@/api/axios.custom";
import Table from "@/components/ui/table/table";
import withAuth from "@/hoc/withAuth";
import useAppState from "@/hooks/useAppState";
import { useEffect, useState } from "react";

const AdminsLog = () => {
  const [data, setData] = useState([]);

  const { access_token } = useAppState();

  useEffect(() => {
    const getAllAdminsLog = async () => {
      try {
        const res = await customAxios.get("admins-log", {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });

        if (res.status === 200) {
          setData(res.data);
          console.log(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (access_token) getAllAdminsLog();
  }, [access_token]);

  return (
    <div className="h-full w-full overflow-y-auto bg-white p-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">Admin's Log</h1>
        <input className="border p-1 text-sm" type="text" name="seach_admin" id="seach_admin" placeholder="Search admin" />
      </div>
      <Table
        data={data}
        enabledActions={false}
        columns={[
          {
            title: "First Name",
            accessorKey: "first_name",
          },
          {
            title: "Last Name",
            accessorKey: "last_name",
          },
          {
            title: "Position",
            accessorKey: "position",
          },
          {
            title: "Date",
            accessorKey: "date",
          },
          {
            title: "Time In",
            accessorKey: "time_in",
          },
          {
            title: "Time Out",
            accessorKey: "time_out",
          },
          {
            title: "No. of Cases",
            accessorKey: "no_of_cases",
          },
        ]}
        deleteDialog={{
          render(props) {
            return <></>;
          },
        }}
        updateDialog={{
          render(props) {
            return <></>;
          },
        }}
      />
    </div>
  );
};

export default withAuth(AdminsLog);

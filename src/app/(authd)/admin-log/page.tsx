"use client";

import customAxios from "@/api/axios.custom";
import Table from "@/components/ui/table/table";
import withAuth from "@/hoc/withAuth";
import useAppState from "@/hooks/useAppState";
import { useEffect, useRef, useState } from "react";

const AdminsLog = () => {
  const [data, setData] = useState([]);

  const { access_token } = useAppState();

  const timer = useRef<any>(null);

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
        <input
          onChange={(event) => {
            const searchAdminLogs = async () => {
              try {
                const q = event.target.value;

                const res = await customAxios.get(`admins-log/search?q=${q}`, {
                  headers: { Authorization: `Bearer ${access_token}` },
                });

                setData(res.data);
              } catch (error) {
                console.error(error);
              }
            };

            if (event.target.value.length > 0) {
              clearTimeout(timer.current);
              timer.current = setTimeout(searchAdminLogs, 500);
            } else {
              const getAllAdminsLog = async () => {
                try {
                  const res = await customAxios.get("admins-log", {
                    headers: {
                      Authorization: `Bearer ${access_token}`,
                    },
                  });

                  if (res.status === 200) {
                    setData(res.data);
                  }
                } catch (error) {
                  console.error(error);
                }
              };
              getAllAdminsLog();
            }
          }}
          className="border p-1 text-sm"
          type="text"
          name="seach_admin"
          id="seach_admin"
          placeholder="Search names"
        />
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

"use client";
import customAxios from "@/api/axios.custom";
import DeleteUserDialog from "@/components/cit-department/deleteUser.dialog";
import UpdateUserDialog from "@/components/cit-department/updateUser.dialog";
import Table from "@/components/ui/table/table";
import withAuth from "@/hoc/withAuth";
import useAppState from "@/hooks/useAppState";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const CITDepartmentPage = () => {
  const router = useRouter();

  const [tableData, setTableData] = useState([]);

  const { access_token } = useAppState();

  const [usersCountByRole, setUsersCountByRole] = useState<{
    [key: string]: 0 | string;
    PROFESSOR: 0 | string;
    STUDENT: 0 | string;
    STAFF: 0 | string;
  }>({
    PROFESSOR: 0,
    STUDENT: 0,
    STAFF: 0,
  });

  //  TODO: [✅] Populate the table by fetching the data from the API
  useEffect(() => {
    const getAllUsers = async () => {
      const res = await customAxios.get("users/all", {
        headers: { Authorization: `Bearer ${access_token}` },
      });

      const tmp = res.data.map((user: any) => ({
        ...user,
        emergency_no: user.emergency_no.join(","),
        medical_conditions: user.medical_conditions.join(","),
      }));

      setTableData(tmp);
    };

    const getUsersCountByRole = async () => {
      try {
        const res = await customAxios.get("users/analytics", { headers: { Authorization: `Bearer ${access_token}` } });

        if (res.status === 200) {
          res.data.map((role: { role: string; count: string }) => {
            usersCountByRole[role.role] = role.count;
          });

          setUsersCountByRole(usersCountByRole);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (access_token) {
      getUsersCountByRole();
      getAllUsers();
    }
  }, [access_token]);

  const timer = useRef<any>(null);

  return (
    <div className="flex h-full w-full flex-col overflow-y-auto bg-white p-4">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex">
          <h1 onClick={() => router.replace("/dashboard")} className="cursor-pointer text-xl">
            Dashboard
          </h1>
          <h1 className="mx-4 text-xl">/</h1>
          <h1 className="text-xl font-bold">CIT Department</h1>
        </div>
        <input
          onChange={(event) => {
            const q = event.target.value;
            const searchUsers = async () => {
              try {
                const res = await customAxios.get(`users/search?q=${q}`, {
                  headers: {
                    Authorization: `Bearers ${access_token}`,
                  },
                });
                if (res.status === 200) {
                  setTableData(res.data);
                }
              } catch (error) {
                console.error(error);
              }
            };

            if (q.length > 0) {
              clearTimeout(timer.current);
              timer.current = setTimeout(searchUsers, 200);
            } else {
              const getAllUsers = async () => {
                const res = await customAxios.get("users/all", {
                  headers: { Authorization: `Bearer ${access_token}` },
                });

                const tmp = res.data.map((user: any) => ({
                  ...user,
                  emergency_no: user.emergency_no.join(","),
                  medical_conditions: user.medical_conditions.join(","),
                }));

                setTableData(tmp);
              };
              getAllUsers();
            }
          }}
          className="border p-1 text-sm"
          type="text"
          name="seach_admin"
          id="seach_admin"
          placeholder="Search names"
        />
      </div>
      <div className="my-2 flex justify-around border-b border-t py-2">
        <div className="flex items-center">
          <span className="font-bold">Total No. of Students:</span>
          <span className="font-bo mx-1 rounded border border-stone-700 px-2 py-1">{usersCountByRole.STUDENT}</span>
        </div>
        <div className="flex items-center">
          <span className="font-bold">Total No. of Professors:</span>
          <span className="font-bo mx-1 rounded border border-stone-700 px-2 py-1">{usersCountByRole.PROFESSOR}</span>
        </div>
        <div className="flex items-center">
          <span className="font-bold">Total No. of Staffs:</span>
          <span className="font-bo mx-1 rounded border border-stone-700 px-2 py-1">{usersCountByRole.STAFF}</span>
        </div>
      </div>
      <Table
        enabledActions={true}
        columns={[
          { title: "Role", accessorKey: "role" },
          { title: "First Name", accessorKey: "first_name" },
          { title: "Last Name", accessorKey: "last_name" },
          { title: "Email", accessorKey: "email" },
          { title: "Emergency No.", accessorKey: "emergency_no" },
          { title: "Address (City)", accessorKey: "city" },
          { title: "Medical Conditions", accessorKey: "medical_conditions" },
        ]}
        data={tableData}
        deleteDialog={{ render: DeleteUserDialog }}
        updateDialog={{ render: UpdateUserDialog }}
      />
    </div>
  );
};

export default withAuth(CITDepartmentPage);

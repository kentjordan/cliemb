"use client";
import Table from "@/components/ui/table/table";
import { useRouter } from "next/navigation";
import withAuth from "@/hoc/withAuth";
import DeleteHotlineDialog from "@/components/emergency-hotlines/deleteHotline.dialog";
import UpdateHotlineDialog from "@/components/emergency-hotlines/updateHotline.dialog";
import { useEffect, useState } from "react";
import customAxios from "@/api/axios.custom";
import useAppState from "@/hooks/useAppState";

const EmergencyHotlinesPage = () => {
  const { access_token } = useAppState();
  const [tableData, setTableData] = useState([]);

  // TODO: Populate table by the data from the API
  useEffect(() => {
    const getAllHotlines = async () => {
      try {
        const res = await customAxios.get("emergency-hotlines", { headers: { Authorization: `Bearer ${access_token}` } });
        setTableData(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (access_token) getAllHotlines();
  }, [access_token]);

  const router = useRouter();

  return (
    <div className="flex h-full w-full flex-col overflow-y-auto p-4">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex">
          <h1 onClick={() => router.replace("/dashboard")} className="cursor-pointer text-xl">
            Dashboard
          </h1>
          <h1 className="mx-4 text-xl">/</h1>
          <h1 className="text-xl font-bold">Emergency Hotlines</h1>
        </div>
        <input className="border p-1 text-sm" type="text" name="seach_admin" id="seach_admin" placeholder="Search..." />
      </div>
      <Table
        enabledActions={true}
        columns={[
          { title: "Name", accessorKey: "name" },
          { title: "Landline Number/s", accessorKey: "landline_no" },
          { title: "Mobile Number/s", accessorKey: "mobile_no" },
          { title: "Address", accessorKey: "city" },
        ]}
        data={tableData}
        deleteDialog={{
          render: DeleteHotlineDialog,
        }}
        updateDialog={{
          render: UpdateHotlineDialog,
        }}
      />
    </div>
  );
};

export default withAuth(EmergencyHotlinesPage);

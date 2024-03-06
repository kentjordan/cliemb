"use client";
import Table from "@/components/ui/table/table";
import { useRouter } from "next/navigation";
import withAuth from "@/hoc/withAuth";
import DeleteHotlineDialog from "@/components/emergency-hotlines/deleteHotline.dialog";
import UpdateHotlineDialog from "@/components/emergency-hotlines/updateHotline.dialog";
import { useEffect, useRef, useState } from "react";
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

  const timer = useRef<any>(null);

  return (
    <div className="flex h-full w-full flex-col overflow-y-auto bg-white p-4">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex">
          <h1 onClick={() => router.replace("/dashboard")} className="cursor-pointer text-xl">
            Dashboard
          </h1>
          <h1 className="mx-4 text-xl">/</h1>
          <h1 className="text-xl font-bold">Emergency Hotlines</h1>
        </div>
        <input
          onChange={(event) => {
            clearTimeout(timer.current);
            timer.current = setTimeout(async () => {
              try {
                const res = await customAxios.get(`emergency-hotlines/search?q=${event.target.value}`, {
                  headers: { Authorization: `Bearer ${access_token}` },
                });
                setTableData(res.data);
              } catch (error) {
                console.error(error);
              }
            }, 500);
          }}
          className="border p-1 text-sm"
          type="text"
          name="seach_admin"
          id="seach_admin"
          placeholder="Search"
        />
      </div>
      <Table
        enabledActions={true}
        columns={[
          {
            title: "Name",
            accessorKey: "name",
            render({ item, data }) {
              return <span className="inline-block max-w-[32ch] overflow-hidden text-sm">{item.name}</span>;
            },
          },
          {
            title: "Landline Number/s",
            accessorKey: "landline_no",
            render({ item, data }) {
              return <span className="inline-block max-w-[32ch] overflow-hidden text-sm">{item.landline_no.join(", ")}</span>;
            },
          },
          {
            title: "Mobile Number/s",
            accessorKey: "mobile_no",
            render({ item, data }) {
              return <span className="inline-block max-w-[32ch] overflow-hidden text-sm">{item.mobile_no.join(", ")}</span>;
            },
          },
          {
            title: "Address",
            accessorKey: "city",
            render({ item, data }) {
              return <span className="inline-block max-w-[32ch] overflow-hidden text-sm">{item.city}</span>;
            },
          },
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

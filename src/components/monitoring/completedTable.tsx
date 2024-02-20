import customAxios from "@/api/axios.custom";
import Table from "@/components/ui/table/table";
import useAppState from "@/hooks/useAppState";

import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";

const CompletedTable = ({ socket }: { socket: Socket }) => {
  const [monitoringData, setMonitoringData] = useState([]);
  const { access_token } = useAppState();

  useEffect(() => {
    if (access_token) {
      const getMonitoringData = async () => {
        const res = await customAxios.get("monitoring/?state=COMPLETED", {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });

        setMonitoringData(res.data);
      };

      getMonitoringData();

      socket.on("web-new-monitoring-message", async () => {
        const res = await customAxios.get("monitoring", {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });

        const data = res.data.map((e: any) => {
          return {
            ...e,
          };
        });

        setMonitoringData(data);
      });

      socket.on("exception", (error) => {
        console.log(error);
      });
    }
  }, [access_token]);

  return (
    <Table
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
          title: "SR-Code",
          accessorKey: "sr_code",
        },
        {
          title: "Date",
          accessorKey: "date",
        },
        {
          title: "Time",
          accessorKey: "time",
        },
        {
          title: "Room",
          accessorKey: "room",
        },
        {
          title: "Floor No.",
          accessorKey: "floor_no",
        },
        {
          title: "Photo",
          accessorKey: "photo",
          render: ({ item, data }) => (
            <div>
              <span className="inline-block w-[16ch] overflow-hidden text-ellipsis whitespace-nowrap text-sm">{data}</span>
            </div>
          ),
        },
        {
          title: "Narrative",
          accessorKey: "narrative",
          render: ({ item, data }) => (
            <div>
              <span className="inline-block w-[16ch] overflow-hidden text-ellipsis whitespace-nowrap text-sm">{data}</span>
            </div>
          ),
        },
        {
          title: "Receieve",
          accessorKey: "state",
          render: ({ item, data }) => {
            switch (data) {
              case "TO RECEIVE":
                return (
                  <button
                    onClick={async () => {
                      const res = await customAxios.patch(
                        `monitoring/state/${item.user_id}`,
                        {
                          state: "PENDING",
                          monitoring_id: item.monitoring_id,
                        },
                        {
                          headers: {
                            Authorization: `Bearer ${access_token}`,
                          },
                        },
                      );
                      location.reload();
                    }}
                    className="flex w-full items-center justify-center rounded bg-red-700 px-2 py-1 text-white"
                  >
                    <span className="inline-block overflow-hidden text-ellipsis whitespace-nowrap text-sm capitalize">
                      receive
                    </span>
                  </button>
                );
              case "PENDING":
                return (
                  <button
                    onClick={async () => {
                      const res = await customAxios.patch(
                        `monitoring/state/${item.user_id}`,
                        {
                          state: "COMPLETED",
                          monitoring_id: item.monitoring_id,
                        },
                        {
                          headers: {
                            Authorization: `Bearer ${access_token}`,
                          },
                        },
                      );
                      location.reload();
                    }}
                    className="flex w-full items-center justify-center rounded bg-stone-500 px-2 py-1 text-white"
                  >
                    <span className="inline-block overflow-hidden text-ellipsis whitespace-nowrap text-sm capitalize">
                      {data.toLowerCase()}
                    </span>
                  </button>
                );
              case "COMPLETED":
                return (
                  <button
                    disabled
                    onClick={() => alert(item.id)}
                    className="flex w-full items-center justify-center rounded bg-green-500 px-2 py-1 text-white"
                  >
                    <span className="inline-block overflow-hidden text-ellipsis whitespace-nowrap text-sm capitalize">
                      completed
                    </span>
                  </button>
                );
              default:
                return (
                  <div>
                    <span className="inline-block overflow-hidden text-ellipsis whitespace-nowrap text-sm capitalize">
                      {data.toLowerCase()}
                    </span>
                  </div>
                );
            }
          },
        },
        {
          title: "Level",
          accessorKey: "emergency_level",
          render: ({ item, data }) => {
            switch (data) {
              case 1:
                return (
                  <div className="flex items-center justify-center">
                    <div className="h-8 w-8 bg-red-700"></div>
                  </div>
                );
              case 2:
                return (
                  <div className="flex items-center justify-center">
                    <div className="h-8 w-8 bg-amber-500"></div>
                  </div>
                );
              case 3:
                return (
                  <div className="flex items-center justify-center">
                    <div className="h-8 w-8 bg-yellow-300"></div>
                  </div>
                );
              case 4:
                return (
                  <div className="flex items-center justify-center">
                    <div className="h-8 w-8 bg-lime-500"></div>
                  </div>
                );
            }
            return <div></div>;
          },
        },
      ]}
      data={monitoringData}
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
  );
};

export default CompletedTable;

import { IApprovalDialogProps } from "../ui/table/table";
import { AxiosError } from "axios";
import useAppState from "@/hooks/useAppState";
import customAxios from "@/api/axios.custom";

const ApprovalUserDialog = ({ selectedItem, approvalDialogStateVisibility }: IApprovalDialogProps) => {
  const { access_token } = useAppState();
  return (
    <div className="flex flex-col rounded bg-white p-3">
      <span className="border-b pb-2 text-xl font-bold">⚠️ Are you sure?</span>
      <div className="mt-4 flex flex-col">
        <span className="mb-4">You are going to approve a student account:</span>
        <span>
          <b>Name</b>: {selectedItem.first_name} {selectedItem.last_name}
        </span>
        <span>
          <b>SR-Code</b>: {selectedItem.sr_code}
        </span>
        <span>
          <b>Email</b>: {selectedItem.email}
        </span>
      </div>
      <div className="mt-8 flex justify-end gap-2">
        <button
          className="rounded bg-green-700 p-1 px-2 font-bold text-white"
          onClick={() => {
            const approveAccount = async () => {
              try {
                const res = await customAxios.patch(
                  `/users/${selectedItem.id}`,
                  {
                    is_account_approved: true,
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${access_token}`,
                    },
                  },
                );

                if (res.status === 200) {
                  alert("User has been approved!");
                  approvalDialogStateVisibility.setStateVisibility(false);
                  location.reload();
                }
              } catch (error) {
                if (error instanceof AxiosError) {
                  alert(error.response?.data.message.join("\n"));
                  approvalDialogStateVisibility.setStateVisibility(false);
                }
              }
            };

            if (access_token) approveAccount();
          }}
        >
          Approve
        </button>
        <button
          className="rounded bg-stone-700 px-2 py-1 text-white"
          onClick={() => {
            approvalDialogStateVisibility.setStateVisibility(false);
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ApprovalUserDialog;

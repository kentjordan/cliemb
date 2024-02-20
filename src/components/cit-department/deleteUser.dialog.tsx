import customAxios from "@/api/axios.custom";
import useAppState from "@/hooks/useAppState";
import { AxiosError } from "axios";
import { IDeleteDialogProps } from "../ui/table/table";

const DeleteUserDialog = ({ selectedItem, deleteDialogStateVisibility }: IDeleteDialogProps) => {
  const { access_token } = useAppState();

  return (
    <div className="flex flex-col rounded bg-white p-4">
      <div className="flex flex-col">
        <span className="border-b pb-2 text-xl font-bold">⚠️ Are you sure?</span>
        <span className="my-3">Deleting a user is irreversible.</span>
        <span className="mt-1">
          Name:{" "}
          <b>
            {selectedItem?.first_name} {selectedItem?.last_name}
          </b>
        </span>
        <span className="mt-1">
          Address:
          <b> {selectedItem?.city}</b>
        </span>
      </div>
      <div className="mt-8 flex flex-row justify-end">
        <button
          onClick={() => {
            const deleteUser = async () => {
              try {
                const res = await customAxios.delete(`users/${selectedItem?.id}`, {
                  headers: { Authorization: `Bearer ${access_token}` },
                });
                if (res.status === 200) {
                  alert("✅ User deleted successfully!");
                  deleteDialogStateVisibility.setStateVisibility(false);
                  location.reload();
                }
              } catch (error) {
                if (error instanceof AxiosError) {
                  alert(error.response?.data.message.join("\n"));
                  deleteDialogStateVisibility.setStateVisibility(false);
                }
              }
            };
            deleteUser();
          }}
          className="mr-1 rounded bg-red-700 px-2 py-1 text-white"
        >
          Delete
        </button>
        <button
          className="ml-1 rounded bg-stone-700 px-2 py-1 text-white"
          onClick={() => deleteDialogStateVisibility.setStateVisibility(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
export default DeleteUserDialog;

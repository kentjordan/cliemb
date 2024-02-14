import customAxios from "@/api/axios.custom";
import useAppState from "@/hooks/useAppState";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { IUpdateDialogProps } from "../ui/table/table";

const UpdateHotlineDialog = ({ selectedItem, itemUpdateState, updateDialogStateVisibility }: IUpdateDialogProps) => {
  const { register, handleSubmit, setValue } = useForm();

  const { access_token } = useAppState();

  console.log(selectedItem);

  useEffect(() => {
    setValue("name", selectedItem.name);
    setValue("landline_no", selectedItem.landline_no);
    setValue("mobile_no", selectedItem.mobile_no);
    setValue("city", selectedItem.city);
  }, []);

  return (
    <div className="rounded bg-white p-6">
      <h1 className="font-border-l-primary mb-4 border-b border-stone-300 py-1 text-lg font-bold">Update Item</h1>
      <div className="flex flex-col gap-2">
        <div className="mr-1 flex flex-col">
          <span className="text-sm text-stone-500">Name</span>
          <input
            {...register("name")}
            className=" rounded border p-1"
            type="text"
            defaultValue={selectedItem?.name}
            placeholder="Name"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-stone-500">Landline Number/s</span>
          <input
            {...register("landline_no")}
            className="rounded border p-1"
            type="text"
            defaultValue={selectedItem?.last_name}
            placeholder="Landline Number/s"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-stone-500">Mobile Number/s</span>
          <input
            {...register("mobile_no")}
            className="rounded border p-1"
            type="text"
            defaultValue={selectedItem?.mobile_no}
            placeholder="Mobile Number/s"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-stone-500">Address</span>
          <input
            {...register("city")}
            className="rounded border p-1"
            type="text"
            defaultValue={selectedItem?.city}
            placeholder="Address (City)"
          />
        </div>
      </div>
      <div className="mt-8 flex justify-end">
        <button
          disabled={itemUpdateState.state}
          onClick={handleSubmit(
            (data) => {
              const updateUser = async () => {
                try {
                  console.log(data);

                  itemUpdateState.setState(true);
                  const res = await customAxios.patch(
                    `emergency-hotlines/${selectedItem?.id}`,
                    { ...data },
                    {
                      headers: {
                        Authorization: `Bearer ${access_token}`,
                      },
                    },
                  );

                  if (res.status === 200) {
                    itemUpdateState.setState(false);
                    alert("✅ User updated succesfully!");
                    updateDialogStateVisibility.setStateVisibility(false);
                    location.reload();
                  }
                } catch (error) {
                  if (error instanceof AxiosError) {
                    alert(error.response?.data.message.join("\n"));
                    itemUpdateState.setState(false);
                  }
                }
              };
              updateUser();
            },
            (errors, event) => {
              console.log(errors);
            },
          )}
          className="mr-1 rounded bg-rose-700 px-2 py-1 text-white"
        >
          {itemUpdateState.state ? "Saving..." : "Save changes"}
        </button>
        <button
          onClick={() => updateDialogStateVisibility.setStateVisibility(false)}
          className="ml-1 rounded bg-stone-700 px-2 py-1 text-white"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
export default UpdateHotlineDialog;

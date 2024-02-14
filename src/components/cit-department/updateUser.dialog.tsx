import customAxios from "@/api/axios.custom";
import useAppState from "@/hooks/useAppState";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { IUpdateDialogProps } from "../ui/table/table";

const UpdateUserDialog = ({ selectedItem, itemUpdateState, updateDialogStateVisibility }: IUpdateDialogProps) => {
  const { register, handleSubmit, setValue } = useForm();

  const { access_token } = useAppState();

  useEffect(() => {
    setValue("first_name", selectedItem.first_name);
    setValue("last_name", selectedItem.last_name);
    setValue("email", selectedItem.email);
    setValue("emergency_no", selectedItem.emergency_no);
    setValue("medical_conditions", selectedItem.medical_conditions);
    setValue("province", selectedItem.province);
    setValue("city", selectedItem.city);
    setValue("barangay", selectedItem.barangay);
  }, []);

  return (
    <div className="rounded bg-white p-6">
      <h1 className="font-border-l-primary mb-4 border-b border-stone-300 py-1 text-lg font-bold">Update Item</h1>
      <div className="flex flex-col gap-2">
        <div className="flex">
          <div className="mr-1 flex flex-col">
            <span className="text-sm text-stone-500">First name</span>
            <input
              {...register("first_name")}
              className=" rounded border p-1"
              type="text"
              defaultValue={selectedItem?.first_name}
              placeholder="First name"
            />
          </div>
          <div className="mr-1 flex flex-col">
            <span className="text-sm text-stone-500">Last name</span>
            <input
              {...register("last_name")}
              className=" rounded border p-1"
              type="text"
              defaultValue={selectedItem?.first_name}
              placeholder="Last name"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-stone-500">Email</span>
          <input
            {...register("email")}
            className="rounded border p-1"
            type="text"
            defaultValue={selectedItem?.email}
            placeholder="Email"
          />
        </div>

        <div className="flex flex-col">
          <span className="text-sm text-stone-500">Emergency No.</span>
          <input
            {...register("emergency_no")}
            className="rounded border p-1"
            type="text"
            defaultValue={selectedItem?.last_name}
            placeholder="Landline Number/s"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-stone-500">Medical Conditions</span>
          <input
            {...register("medical_conditions")}
            className="rounded border p-1"
            type="text"
            defaultValue={selectedItem?.last_name}
            placeholder="Landline Number/s"
          />
        </div>
        <div className="mt-3 flex flex-col gap-2">
          <h1 className="font-bold">Address</h1>
          <div className="flex flex-col">
            <span className="text-sm text-stone-500">Province</span>
            <input
              {...register("province")}
              className="rounded border p-1"
              type="text"
              defaultValue={selectedItem?.emergency_no}
              placeholder="Province"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-stone-500">City</span>
            <input
              {...register("city")}
              className="rounded border p-1"
              type="text"
              defaultValue={selectedItem?.emergency_no}
              placeholder="City"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-stone-500">Barangay</span>
            <input
              {...register("barangay")}
              className="rounded border p-1"
              type="text"
              defaultValue={selectedItem?.emergency_no}
              placeholder="Barangay"
            />
          </div>
        </div>
      </div>
      <div className="mt-8 flex justify-end">
        <button
          disabled={itemUpdateState.state}
          onClick={handleSubmit(
            (data) => {
              const updateUser = async () => {
                try {
                  data = {
                    ...data,
                    emergency_no: data.emergency_no.split(","),
                    medical_conditions: data.medical_conditions.split(","),
                    province: data.province.trim(),
                    city: data.city.trim(),
                    barangay: data.barangay.trim(),
                  };
                  itemUpdateState.setState(true);
                  const res = await customAxios.patch(
                    `users/${selectedItem?.id}`,
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
export default UpdateUserDialog;

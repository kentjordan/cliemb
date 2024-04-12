"use client";
import { useForm } from "react-hook-form";
import { IoMdPerson } from "react-icons/io";
import { useEffect, useState } from "react";
import customAxios from "@/api/axios.custom";
import useAppState from "@/hooks/useAppState";
import withAuth from "@/hoc/withAuth";
import { AxiosError } from "axios";
import Image from "next/image";
import IAdminInfo from "@/types/IAdminInfo";

const ProfilePage = () => {
  const { register, handleSubmit, setValue, resetField } = useForm({});

  const [isFetchingData, setIsFetchingData] = useState(true);
  const [adminInfo, setAdminInfo] = useState<IAdminInfo | null>(null);

  const { access_token } = useAppState();

  const [isPasswordEditing, setIsPasswordEditing] = useState(false);
  const [isPasswordUpdating, setIsPasswordUpdating] = useState(false);

  const [isEmailEditing, setIsEmailEditing] = useState(false);
  const [isEmailUpdating, setIsEmailUpdating] = useState(false);

  const [isGeneralEditing, setIsGeneralEditing] = useState(false);
  const [isGeneralUpdating, setIsGeneralUpdating] = useState(false);

  // TODO: Populate inputs by admin's info by fetching to the API
  useEffect(() => {
    const getAdmin = async () => {
      try {
        const res = await customAxios.get("admins", { headers: { Authorization: `Bearer ${access_token}` } });
        Object.keys(res.data).forEach((e) => {
          setValue(e, res.data[e]);
        });
        setIsFetchingData(false);
        setAdminInfo(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (access_token) {
      getAdmin();
    }
  }, [access_token]);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isProfileImageUploading, setIsProfileImageUploading] = useState(false);

  return (
    <div className="flex w-full flex-col bg-white p-4">
      <div className="w-full p-2">
        <span className="text-2xl font-bold">Profile</span>
      </div>
      <div className="flex h-full w-full bg-stone-800 p-4">
        <div className="relative flex h-full w-full items-center justify-center bg-white">
          {isPasswordEditing && (
            <div className="absolute flex h-full w-full items-center justify-center bg-black/75">
              <div className="flex flex-col rounded bg-white p-8">
                <h1 className="mb-4 text-xl font-bold">Change password</h1>
                <input
                  {...register("new_password", {
                    required: { value: true, message: "No password provided." },
                    minLength: { value: 8, message: "Password should be more than 8 characters." },
                  })}
                  type="password"
                  placeholder="New Password"
                  className="mb-1 rounded border p-1"
                />
                <input
                  {...register("confirm_password", {
                    required: { value: true, message: "No password provided." },
                    minLength: { value: 8, message: "Password should be more than 8 characters." },
                  })}
                  type="password"
                  placeholder="Confirm Password"
                  className="mt-1 rounded border p-1"
                />
                <button
                  disabled={isPasswordUpdating}
                  onClick={handleSubmit(
                    ({ new_password, confirm_password }) => {
                      if (new_password !== confirm_password) {
                        alert("Password don't match.");
                      } else {
                        const updatePassword = async () => {
                          try {
                            setIsPasswordUpdating(true);
                            const res = await customAxios.patch(
                              "admins",
                              {
                                password: new_password,
                              },
                              {
                                headers: { Authorization: `Bearer ${access_token}` },
                              },
                            );

                            if (res.status === 200) {
                              alert("Password updated successfully!");
                              setIsPasswordEditing(false);
                              setIsPasswordUpdating(false);
                              resetField("confirm_password");
                              resetField("new_password");
                            }
                          } catch (error) {
                            console.log(error);
                          }
                        };

                        updatePassword();
                      }
                    },
                    ({ new_password, confirm_password }, event) => {
                      let msg = "";
                      if (new_password) {
                        msg += `New password: ${new_password?.message}\n`;
                      }

                      if (confirm_password) {
                        msg = `Confirm password: ${confirm_password?.message}`;
                      }
                      alert(msg);
                    },
                  )}
                  className="mt-4 rounded bg-red-700 px-2 py-1 text-white"
                >
                  {isPasswordUpdating ? "Updating..." : "Submit"}
                </button>
                <button
                  onClick={() => {
                    setIsPasswordEditing(false);
                    resetField("confirm_password");
                    resetField("new_password");
                  }}
                  className="my-2 rounded bg-stone-700 px-2 py-1 text-white"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
          {isEmailEditing && (
            <div className="absolute flex h-full w-full items-center justify-center bg-black/75">
              <div className="flex flex-col rounded bg-white p-8">
                <h1 className="mb-4 text-xl font-bold">Change email</h1>
                <input
                  {...register("new_email", {
                    required: { value: true, message: "No email provided." },
                  })}
                  type="text"
                  placeholder="New email"
                  className="mb-1 rounded border p-1"
                />
                <input
                  {...register("confirm_email", {
                    required: { value: true, message: "No email provided." },
                  })}
                  type="text"
                  placeholder="Confirm email"
                  className="mt-1 rounded border p-1"
                />
                <button
                  onClick={handleSubmit(
                    ({ new_email, confirm_email }) => {
                      function validateEmailStrict(email: string) {
                        const regex =
                          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                        return regex.test(email);
                      }

                      if (!validateEmailStrict(new_email) || !validateEmailStrict(confirm_email)) {
                        alert("Invalid email.");
                        return;
                      }
                      if (new_email !== confirm_email) {
                        alert("Email don't match.");
                        return;
                      }
                      const updateEmail = async () => {
                        try {
                          setIsEmailUpdating(true);
                          const res = await customAxios.patch(
                            "admins",
                            {
                              email: new_email,
                            },
                            {
                              headers: { Authorization: `Bearer ${access_token}` },
                            },
                          );

                          if (res.status === 200) {
                            setValue("email", new_email);
                            alert("Email updated successfully!");
                            setIsEmailEditing(false);
                            setIsEmailUpdating(false);
                            resetField("confirm_email");
                            resetField("new_email");
                          }
                        } catch (error) {
                          if (error instanceof AxiosError) {
                            if (error.response?.status === 422) {
                              alert("Email is not available.");
                              setIsEmailUpdating(false);
                              return;
                            }
                          }
                          console.log(error);
                        }
                      };

                      updateEmail();
                    },
                    ({ new_email, confirm_email }, event) => {
                      let msg = "";
                      if (new_email) {
                        msg += `New email: ${new_email?.message}\n`;
                      }

                      if (confirm_email) {
                        msg = `Confirm email: ${confirm_email?.message}`;
                      }
                      alert(msg);
                    },
                  )}
                  className="mt-4 rounded bg-red-700 px-2 py-1 text-white"
                >
                  {isEmailUpdating ? "Updating..." : "Submit"}
                </button>
                <button onClick={() => setIsEmailEditing(false)} className="my-2 rounded bg-stone-700 px-2 py-1 text-white">
                  Cancel
                </button>
              </div>
            </div>
          )}
          {isFetchingData && <h1 className="text-2xl font-bold">Loading profile...</h1>}
          {!isFetchingData && (
            <>
              <div className="flex h-full flex-[0.5] justify-center border p-4">
                <div className="flex h-64 w-64 flex-col items-center justify-center bg-stone-800 p-2">
                  {adminInfo?.profile_photo ? (
                    <Image
                      quality={100}
                      className="my-2 h-[85%] w-[85%]"
                      src={adminInfo?.profile_photo}
                      width={500}
                      height={500}
                      alt="Profile Photo"
                    />
                  ) : (
                    <div className=" flex-1 bg-white">
                      <IoMdPerson className="h-full w-full" />
                    </div>
                  )}
                  {imageFile && (
                    <div className="flex gap-2">
                      <button
                        className="text-bold my-2 cursor-pointer rounded bg-white px-2 text-center font-bold text-black"
                        onClick={async () => {
                          setIsProfileImageUploading(true);
                          const formData = new FormData();
                          if (imageFile) {
                            formData.append("photo", imageFile);
                            const res = await customAxios.post("upload/admins/dp", formData, {
                              headers: {
                                Authorization: `Bearer ${access_token}`,
                              },
                            });

                            if (res.status === 201) {
                              location.reload();
                            }
                          }
                        }}
                      >
                        {isProfileImageUploading ? "Submitting..." : "Submit"}
                      </button>
                      <button
                        className="text-bold my-2 cursor-pointer rounded bg-white px-2 text-center font-bold text-black"
                        onClick={async () => setImageFile(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                  {!imageFile && (
                    <label htmlFor="upload-profile-photo" className="text-bold my-2 cursor-pointer text-center text-white">
                      Upload Picture
                    </label>
                  )}
                  <input
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const image = e.target.files?.item(0);
                      if (image) {
                        setImageFile(image);
                      }
                    }}
                    type="file"
                    id="upload-profile-photo"
                  />
                </div>
              </div>
              <div className="h-full flex-1 p-4">
                {/* Profile name */}
                <div className="mb-8 w-full">
                  <span className="text-2xl font-bold">
                    {adminInfo ? `${adminInfo.first_name} ${adminInfo.last_name}` : ""}
                  </span>
                  <div className="mt-2 h-[3px] bg-stone-800"></div>
                </div>
                <h1 className="my-4 text-xl font-bold">General</h1>

                {/* Position */}
                <div className="mx-2 my-3 flex flex-col">
                  <span className="font-bold">Position</span>
                  <input
                    disabled={!isGeneralEditing}
                    {...register("position")}
                    type="text"
                    className="border p-1 uppercase"
                    placeholder="Position"
                  />
                </div>
                {/* First name, last name, username, password, confirm password, etc... */}
                <div className="flex w-full flex-wrap">
                  <div className="flex flex-1 flex-col gap-2">
                    <div className="m-2 flex flex-col">
                      <span className="font-bold">First name</span>
                      <input
                        disabled={!isGeneralEditing}
                        {...register("first_name")}
                        type="text"
                        className="border p-1"
                        placeholder="First name"
                      />
                    </div>
                    <div className="m-2 flex flex-col">
                      <span className="font-bold">Last name</span>
                      <input
                        disabled={!isGeneralEditing}
                        {...register("last_name")}
                        type="text"
                        className="border p-1"
                        placeholder="Last name"
                      />
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col gap-2">
                    <div className="m-2 flex flex-col">
                      <span className="font-bold">Username</span>
                      <input
                        disabled={!isGeneralEditing}
                        {...register("username")}
                        type="text"
                        className="border p-1"
                        placeholder="Username"
                      />
                    </div>
                    <div className="m-2 flex flex-col">
                      <span className="font-bold">Contact No.</span>
                      <input
                        disabled={!isGeneralEditing}
                        {...register("contact_no")}
                        type="text"
                        className="border p-1"
                        placeholder="Contact No."
                      />
                    </div>
                  </div>
                </div>
                {/* Edit Info button */}
                <div className="mt-4 flex w-full justify-end">
                  {isGeneralEditing && (
                    <>
                      <button
                        disabled={isGeneralUpdating}
                        onClick={handleSubmit(
                          ({ position, first_name, last_name, username, contact_no }) => {
                            const updateAdmin = async () => {
                              try {
                                setIsGeneralUpdating(true);
                                const res = await customAxios.patch(
                                  "admins",
                                  {
                                    position,
                                    first_name,
                                    last_name,
                                    username,
                                    contact_no,
                                  },
                                  {
                                    headers: {
                                      Authorization: `Bearer ${access_token}`,
                                    },
                                  },
                                );
                                if (res.status === 200) {
                                  setIsGeneralEditing(false);
                                  setIsGeneralUpdating(false);
                                }
                              } catch (error) {
                                console.log(error);
                              }
                            };

                            updateAdmin();
                          },
                          (errors, event) => {
                            console.log(errors);
                          },
                        )}
                        className="mr-3 rounded bg-red-700 px-3 py-2 text-white"
                      >
                        {isGeneralUpdating ? "Saving..." : "Save changes"}
                      </button>
                      <button onClick={() => setIsGeneralEditing(false)} className="rounded bg-stone-700 px-3 py-2 text-white">
                        Cancel
                      </button>
                    </>
                  )}
                  {!isGeneralEditing && (
                    <button onClick={() => setIsGeneralEditing(true)} className="rounded bg-stone-700 px-3 py-2 text-white">
                      Edit
                    </button>
                  )}
                </div>
                <h1 className="my-4 text-xl font-bold">Credentials</h1>
                <div className="my-4 flex flex-col">
                  <div className="flex">
                    <span className="font-bold">Password</span>
                    <span onClick={() => setIsPasswordEditing(true)} className="mx-2 cursor-pointer text-blue-600">
                      Edit
                    </span>
                  </div>
                  <input disabled={true} type="password" className="border p-1" placeholder="********" />
                </div>
                <div className="my-4 flex flex-col">
                  <div className="flex">
                    <span className="font-bold">Email Address</span>
                    <span onClick={() => setIsEmailEditing(true)} className="mx-2 cursor-pointer text-blue-600">
                      Edit
                    </span>
                  </div>
                  <input
                    {...register("email")}
                    type="text"
                    disabled={true}
                    className="border p-1"
                    placeholder="Email Address"
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default withAuth(ProfilePage);

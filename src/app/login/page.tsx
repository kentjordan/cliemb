"use client";
import Image from "next/image";
import BSULogo from "@/assets/bsu.png";
import BSUBuilding from "@/assets/bsu-building.jpg";
import CLIEMBLogo from "@/assets/cliemb.png";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import loginSchema from "@/schemas/login/login.schema";
import { useState } from "react";
import { PulseLoader } from "react-spinners";
import customAxios from "@/api/axios.custom";
import { useRouter } from "next/navigation";
import { setAccessToken } from "@/redux/app.slice";
import { useDispatch } from "react-redux";
import { AxiosError } from "axios";

const LoginPage = () => {
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <div className="flex min-h-screen w-full flex-col bg-cover" style={{ backgroundImage: `url(${BSUBuilding.src})` }}>
      {/* Navbar */}
      <div className="flex justify-center bg-black/50 py-4 text-white md:justify-between">
        <div className="hidden flex-[0.5] items-center justify-start text-xl md:flex">
          <Image quality={100} src={CLIEMBLogo} width={300} alt="CLIEMB Logo" />
        </div>
        <ul className="hidden flex-[0.5] items-center justify-center gap-6 text-lg sm:flex md:justify-end md:gap-16 md:px-16">
          <li>Home</li>
          <li>About</li>
        </ul>
      </div>
      {/* Body */}
      <div className="flex flex-1 items-center justify-center bg-black/50 md:justify-between">
        {/* Login Form */}
        <div className="m-4 flex h-fit w-full flex-col items-center rounded-2xl bg-white p-8 shadow md:m-0 md:ml-16 md:w-fit md:px-16 md:py-10">
          <Image src={BSULogo} quality={100} width={140} height={140} alt="BSU Logo" />
          <h1 className="my-8 text-xl font-bold">ADMIN LOGIN</h1>
          <form
            className="my-2 flex w-full flex-col gap-4"
            onSubmit={handleSubmit(async (data) => {
              try {
                setIsLoggingIn(true);

                const res = await customAxios.post("auth/login/admin", data, { withCredentials: true });
                dispatch(setAccessToken(res.data.access_token));

                router.replace("/dashboard");
              } catch (error) {
                setIsLoggingIn(false);

                if (error instanceof AxiosError) {
                  if (error.code === "ERR_NETWORK") {
                    alert("We can't reach the server. Please try again.");
                  }

                  if (error.response?.status === 400) {
                    alert(error.response.data.message);
                  }
                  if (error.response?.status === 404) {
                    alert("Account was  not found.");
                  }
                  if (error.response?.status === 500) {
                    alert(error.response?.data.message);
                  }
                }
              }
            })}
          >
            <Input {...register("email")} className="w-full text-base md:w-96" placeholder="Email" />
            <Input {...register("password")} type="password" className="w-full text-base md:w-96" placeholder="Password" />
            <Button disabled={isLoggingIn} className="my-3 bg-[#B20303] p-4 text-lg font-bold hover:bg-[#B20303]">
              {isLoggingIn ? <PulseLoader color="white" size={8} /> : "LOGIN"}
            </Button>
          </form>
          <div>
            <span className="my-2">Dont have an account? </span>
            <Link href="/signup" className="my-2 font-bold">
              Signup
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

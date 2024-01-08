"use client";
import Image from "next/image";
import BSULogo from "@/assets/bsu.png";
import BSUBuilding from "@/assets/bsu-building.jpg";
import CLIEMBLogo from "@/assets/cliemb.png";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";

const LoginPage = () => {
  const { register, handleSubmit } = useForm();

  return (
    <div style={{ backgroundImage: `url(${BSUBuilding.src})` }} className="flex h-full w-full flex-col bg-cover">
      {/* Navbar */}
      <div className="flex justify-center bg-black/50 py-4 text-white md:justify-between">
        <div className="hidden flex-[0.5] items-center justify-start text-xl md:flex">
          <Image quality={100} src={CLIEMBLogo} width={300} alt="CLIEMB Logo" />
        </div>
        <ul className="hidden flex-[0.5] items-center justify-center gap-6 text-lg sm:flex md:justify-end md:gap-16 md:px-16">
          <li>Home</li>
          <li>About</li>
          <li>Dashboard</li>
          <li>Signup</li>
        </ul>
      </div>
      {/* Body */}
      <div className="flex flex-1 items-center justify-center bg-black/50 md:justify-between">
        {/* Login Form */}
        <div className="m-4 flex h-fit w-full flex-col items-center rounded-2xl bg-white p-8 shadow md:m-0 md:ml-16 md:w-fit md:px-16 md:py-10">
          <Image src={BSULogo} quality={100} className="mb-12" width={140} height={140} alt="BSU Logo" />
          <form className="my-2 flex w-full flex-col gap-4" onSubmit={handleSubmit(() => {})}>
            <Input {...register("email")} className="w-full rounded-3xl text-base md:w-96" placeholder="Email" />
            <Input
              {...register("password")}
              type="password"
              className="w-full rounded-3xl text-base md:w-96"
              placeholder="Password"
            />
            <Button className="my-3 rounded-3xl bg-[#B20303] p-6 text-lg font-bold hover:bg-[#B20303]">LOGIN</Button>
          </form>
          <span className="my-2">
            Dont have an account? <b>Signup</b>
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

import { LogoWhite } from "@/assets";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

const SignUp = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <div className="flex flex-col items-center h-screen">
      <button>
        <img src={LogoWhite} alt="LogoWhite" className="mb-20 w-[180px]" />
      </button>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-8 w-[460px] font-Inter"
      >
        <div className="flex flex-col items-center gap-3">
          <h1 className="font-bold text-2xl text-white">Create an Account</h1>
          <h3 className="text-white">Get started to share books & reading</h3>
        </div>
        <Input type="email" id="email" placeholder="Email" />
        <Input type="password" id="password" placeholder="Password" />
        <Input
          type="password"
          id="ConfirmPassword"
          placeholder="Confirm Password"
        />

        <Button variant={"default"} size={"full"} text={"white"}>
          Create an Account
        </Button>
        <div className="flex items-center gap-3">
          <span className="text-white cursor-default">
            Already have an account?
          </span>
          <a className="font-semibold text-white" href="/auth/login">
            Login
          </a>
        </div>
      </form>
    </div>
  );
};

export default SignUp;

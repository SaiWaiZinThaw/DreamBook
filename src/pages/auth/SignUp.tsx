import { LogoWhite } from "@/assets";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { NavLink } from "react-router-dom";

const SignUp = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <div className="flex flex-col items-center pt-20">
      <NavLink to="/">
        <img
          src={LogoWhite}
          alt="LogoWhite"
          className="mb-14 w-[180px] cursor-pointer pointer-events-auto"
        />
      </NavLink>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-7 w-[460px] font-Inter"
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
          <a
            className="font-semibold text-white hover:text-primary"
            href="/auth/login"
          >
            Login
          </a>
        </div>
      </form>
    </div>
  );
};

export default SignUp;

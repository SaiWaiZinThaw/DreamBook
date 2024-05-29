import { LogoWhite } from "@/assets";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useSignUp } from "@/hooks/useAuth";
import React, { useEffect, useState } from "react";

import { NavLink } from "react-router-dom";

const SignUp = () => {
  const [accountData, setAccountData] = useState({
    email: "",
    password: "",
  });
  const createAccount = useSignUp();

  useEffect(() => {
    if (createAccount.isSuccess) {
      console.log(createAccount.data);
    }
  }, [createAccount.isSuccess]);

  useEffect(() => {
    if (createAccount.isError) {
      alert("Error");
    }
  }, [createAccount.isError]);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const data = { ...accountData };
    createAccount.mutate(data);
    console.log(data);
  };
  return (

    <div className="flex flex-col items-center">
      <NavLink to={"/"}>
        <img src={LogoWhite} alt="LogoWhite" className="mb-20 w-[280px]" />
      </NavLink>
      <form className="flex flex-col items-center gap-8 w-[460px] font-Inter">

        <div className="flex flex-col items-center gap-3">
          <h1 className="font-bold text-2xl text-white">Create an Account</h1>
          <h3 className="text-white">Get started to share books & reading</h3>
        </div>
        <Input
          type="email"
          id="email"
          placeholder="Email"
          value={accountData.email}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setAccountData((prev) => ({ ...prev, email: event.target.value }));
          }}
        />
        <Input
          type="password"
          id="password"
          placeholder="Password"
          value={accountData.password}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setAccountData((prev) => ({
              ...prev,
              password: event.target.value,
            }));
          }}
        />
        <Input
          type="password"
          id="ConfirmPassword"
          placeholder="Confirm Password"
        />

        <NavLink to={"/register/create-account"}>
          <Button
            variant={"default"}
            size={"full"}
            text={"white"}
            type="submit"
            onClick={handleSubmit}
          >
            Create an Account
          </Button>
        </NavLink>
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

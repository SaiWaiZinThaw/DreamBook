import { LogoWhite } from "@/assets";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useLogIn } from "@/hooks/useAuth";
import { useEffect, useState } from "react";


const Login = () => {
  const [accountData, setAccountData] = useState({
    email: "",
    password: "",
  });
  const LoginAccount = useLogIn();

  useEffect(() => {
    if (LoginAccount.isSuccess) {
      console.log(LoginAccount.data);
    }
  }, [LoginAccount.isSuccess]);

  useEffect(() => {
    if (LoginAccount.isError) {
      alert("Error");
    }
  }, [LoginAccount.isError]);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const data = { ...accountData };
    LoginAccount.mutate(data);
    console.log(data);
  };
  return (

    <div className="flex flex-col items-center">
      <NavLink to={"/"}>
        <img src={LogoWhite} alt="LogoWhite" className="mb-20 w-[280px]" />
      </NavLink>
      <form className="flex flex-col items-center gap-8 w-[460px] font-Inter">

        <div className="flex flex-col items-center gap-3">
          <h1 className="font-bold text-2xl text-white">Welcome Again!</h1>
          <h3 className="text-white">Please Login to your account</h3>
        </div>
        <Input
          type="email"
          id="name"
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

        <Button
          variant={"default"}
          size={"full"}
          text={"white"}
          onClick={handleSubmit}
        >
          Log in
        </Button>
        <div className="flex items-center gap-3">
          <span className="text-white cursor-default">
            Don't have an account?
          </span>
          <a
            className="font-semibold text-white hover:text-primary"
            href="/auth/signup"
          >
            Create an account
          </a>
        </div>
      </form>
    </div>
  );
};

export default Login;

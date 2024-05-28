import { LogoWhite } from "@/assets";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NavLink } from "react-router-dom";

const Login = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <div className="flex flex-col items-center pt-20 h-screen">
      <NavLink to="/">
        <img
          src={LogoWhite}
          alt="LogoWhite"
          className="mb-14 w-[180px] cursor-pointer pointer-events-auto"
        />
      </NavLink>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-8 w-[460px] font-Inter"
      >
        <div className="flex flex-col items-center gap-3">
          <h1 className="font-bold text-2xl text-white">Welcome Again!</h1>
          <h3 className="text-white">Please Login to your account</h3>
        </div>
        <Input type="text" id="name" placeholder="Username" />
        <Input type="password" id="password" placeholder="Password" />

        <Button variant={"default"} size={"full"} text={"white"}>
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

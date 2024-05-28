import { LogoWhite } from "@/assets";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Login = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <div className="flex flex-col items-center h-screen">
      <img src={LogoWhite} alt="LogoWhite" className="mb-20 w-[180px]" />
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
          <a className="text-white" href="#">
            Don't have an account?
          </a>
          <a className="font-semibold text-white" href="#">
            Create an account
          </a>
        </div>
      </form>
    </div>
  );
};

export default Login;

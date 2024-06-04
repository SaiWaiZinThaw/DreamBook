import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLogIn } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "@/services/authService";
import { ButtonLoading } from "@/components/ui/loading-button";
import { useForm } from "react-hook-form";

const Login = () => {
  const { register, formState } = useForm<{
    email: string;
    password: string;
  }>({ mode: "all" });
  const navigate = useNavigate();
  const [accountData, setAccountData] = useState({
    email: "",
    password: "",
  });
  const LoginAccount = useLogIn();

  useEffect(() => {
    if (LoginAccount.isSuccess) {
      console.log(LoginAccount.data);
      const authToken = LoginAccount.data.access_token;
      delete LoginAccount.data.access_token;
      login(authToken);
      navigate("/");
    }
  }, [LoginAccount.isSuccess]);

  useEffect(() => {
    if (LoginAccount.isError) {
      alert("Error");
    }
  }, [LoginAccount.isError]);

  const handleButton = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const data = { ...accountData };
    LoginAccount.mutate(data);
    console.log(data);
  };
  
  return (
    <div className="flex flex-col justify-self-center items-center gap-10">
      <form className="flex flex-col items-center gap-6 w-[460px] font-Inter">
        <div className="flex flex-col items-center gap-3">
          <h1 className="font-bold text-2xl text-white">Welcome Again!</h1>
          <h3 className="text-white">Please Login to your account</h3>
        </div>
        {formState.errors.email?.message &&
        formState.errors.password?.message ? (
          <p className="font-bold text-red-600">Email & password is required</p>
        ) : (
          <div></div>
        )}

        <Input
          type="email"
          id="name"
          placeholder="Email"
          value={accountData.email}
          {...register("email", {
            required: { value: true, message: "Email is required" },
          })}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setAccountData((prev) => ({ ...prev, email: event.target.value }));
          }}
        />
        <Input
          type="password"
          id="password"
          placeholder="Password"
          value={accountData.password}
          {...register("password", {
            required: { value: true, message: "Password is required" },
          })}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setAccountData((prev) => ({
              ...prev,
              password: event.target.value,
            }));
          }}
        />

        {!LoginAccount.isPending ? (
          <Button
            variant={"default"}
            size={"full"}
            text={"white"}
            onClick={handleButton}
          >
            Log in
          </Button>
        ) : (
          <ButtonLoading />
        )}
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

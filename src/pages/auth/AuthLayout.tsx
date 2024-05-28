import { LoginBackground } from "@/assets";
import SignUp from "./SignUp";
SignUp;
const LoginLayout = () => {
  return (
    <div
      className="flex justify-center items-center bg-cover p-20 w-full h-min-screen"
      style={{ backgroundImage: `url(${LoginBackground})` }}
    >
      <SignUp />
    </div>
  );
};

export default LoginLayout;

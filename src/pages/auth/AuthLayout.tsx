import { LoginBackground } from "@/assets";
import ProfileSetup from "./ProfileSetup";

const LoginLayout = () => {
  return (
    <div
      className="flex justify-center items-center bg-cover p-20 w-full h-min-screen"
      style={{ backgroundImage: `url(${LoginBackground})` }}
    >
      <ProfileSetup />
    </div>
  );
};

export default LoginLayout;

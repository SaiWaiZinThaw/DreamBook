import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePasswordChange } from "@/hooks/usePasswordChange";
import { PasswordChangeData } from "@/types/types";

import { useEffect, useState } from "react";

import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ChangePassword = () => {
  const passwordChange = usePasswordChange();
  const [passwordData, setPasswordData] = useState<PasswordChangeData>({
    oldPassword: "",
    newPassword: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (passwordData.newPassword !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Passwords do not match",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
    passwordChange.mutate(passwordData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  useEffect(() => {
    if (passwordChange.isSuccess) {
      Swal.fire({
        icon: "success",
        title: "Password is Updated",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }, [passwordChange.isSuccess]);

  return (
    <section className="flex justify-center items-center w-full">
      <div className="flex flex-col ml-[165px] w-[544px] h-[451px]">
        <h1 className="mb-[16px] font-bold text-2xl text-center">
          Change Your Password
        </h1>
        <p className="font-normal text-center text-slate-500 text-sm">
          The new password you set must be different to the previous one
        </p>

        <form onSubmit={handleSubmit}>
          <div className="relative mt-[36px] mb-[44px]">
            <Input
              onChange={handleInputChange}
              value={passwordData.oldPassword}
              name="oldPassword"
              type={showOldPassword ? "text" : "password"}
              placeholder="Enter Old Password"
            />
            <div
              className="top-1/2 right-3 absolute transform -translate-y-1/2 cursor-pointer"
              onClick={() => setShowOldPassword(!showOldPassword)}
            >
              {showOldPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          <div className="relative mb-[44px]">
            <Input
              onChange={handleInputChange}
              value={passwordData.newPassword}
              name="newPassword"
              type={showNewPassword ? "text" : "password"}
              placeholder="Enter New Password"
            />
            <div
              className="top-1/2 right-3 absolute transform -translate-y-1/2 cursor-pointer"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          <div className="relative mb-[44px]">
            <Input
              onChange={handleConfirmPasswordChange}
              value={confirmPassword}
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
            />
            <div
              className="top-1/2 right-3 absolute transform -translate-y-1/2 cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          <Button type="submit" className="rounded-[8px] w-full h-[45px]">
            Change Password
          </Button>
        </form>
      </div>
    </section>
  );
};

export default ChangePassword;

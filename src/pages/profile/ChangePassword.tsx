import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePasswordChange } from "@/hooks/usePasswordChange";
import { PasswordChangeData } from "@/types/types";

import { useEffect, useState } from "react";

import Swal from "sweetalert2";

const ChangePassword = () => {
  const passwordChange = usePasswordChange();
  const [passwordData, setPasswordData] = useState<PasswordChangeData>({
    oldPassword: "",
    newPassword: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    passwordChange.mutate(passwordData);
    console.log(passwordData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
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
    <section className="flex items-center justify-center w-full">
      <div className="flex flex-col ml-[165px] w-[544px] h-[451px]">
        <h1 className="mb-[16px] font-bold text-2xl text-center">
          Change Your Password
        </h1>
        <p className="text-sm font-normal text-center text-slate-500">
          The new password you set must be different ot the previous one
        </p>

        <form onSubmit={handleSubmit}>
          <div className="relative mt-[36px] mb-[44px]">
            <Input
              onChange={handleInputChange}
              value={passwordData.oldPassword}
              name="oldPassword"
              type="password"
              placeholder="Enter Old Password"
            />
            {/* <AiOutlineUser className="top-[12.7px] right-2 absolute w-[21px] h-[21px] text-gray-400" /> */}
          </div>

          <div className="relative mb-[44px]">
            <Input
              onChange={handleInputChange}
              value={passwordData.newPassword}
              name="newPassword"
              type="password"
              placeholder="Enter New Password"
            />
            {/* <AiOutlineUser className="top-[12.7px] right-2 absolute w-[21px] h-[21px] text-gray-400" /> */}
          </div>

          <div className="relative mb-[44px]">
            <Input
              onChange={handleConfirmPasswordChange}
              value={confirmPassword}
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
            />
            {/* <AiOutlineUser className="top-[12.7px] right-2 absolute w-[21px] h-[21px] text-gray-400" /> */}
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

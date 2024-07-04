// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { usePasswordChange } from "@/hooks/usePasswordChange";
// import { PasswordChangeData } from "@/types/types";

// import { useEffect, useState } from "react";
// import Swal from "sweetalert2";
// import { FaEye, FaEyeSlash } from "react-icons/fa";

// const ChangePassword = () => {
//   const passwordChange = usePasswordChange();
//   const [passwordData, setPasswordData] = useState<PasswordChangeData>({
//     oldPassword: "",
//     newPassword: "",
//   });
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [showOldPassword, setShowOldPassword] = useState(false);
//   const [showNewPassword, setShowNewPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [passwordMismatchError, setPasswordMismatchError] = useState(false);

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     // Client-side validation
//     if (passwordData.newPassword !== confirmPassword) {
//       setPasswordMismatchError(true);
//       return;
//     }

//     // Server-side validation handled by usePasswordChange hook
//     passwordChange.mutate(passwordData);
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setPasswordData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setConfirmPassword(e.target.value);
//     setPasswordMismatchError(false); // Reset mismatch error on change
//   };

//   useEffect(() => {
//     if (passwordChange.isSuccess) {
//       Swal.fire({
//         icon: "success",
//         title: "Password Updated",
//         showConfirmButton: false,
//         timer: 1500,
//       });
//       setPasswordData({ oldPassword: "", newPassword: ""}); // Clear form fields on success
//     }
//     // Handle errors from passwordChange.mutate if needed
//   }, [passwordChange.isSuccess]);

//   return (
//     <section className="flex justify-center items-center w-full">
//       <div className="flex flex-col ml-[165px] w-[544px] h-[451px]">
//         <h1 className="mb-[16px] font-bold text-2xl text-center">
//           Change Your Password
//         </h1>
//         <p className="font-normal text-center text-slate-500 text-sm">
//           The new password you set must be different to the previous one
//         </p>

//         <form onSubmit={handleSubmit}>
//           <div className="relative mt-[36px] mb-[44px]">
//             <Input
//               onChange={handleInputChange}
//               value={passwordData.oldPassword}
//               name="oldPassword"
//               type={showOldPassword ? "text" : "password"}
//               placeholder="Enter Old Password"
//             />
//             <div
//               className="top-1/2 right-3 absolute transform -translate-y-1/2 cursor-pointer"
//               onClick={() => setShowOldPassword(!showOldPassword)}
//             >
//               {showOldPassword ? <FaEyeSlash /> : <FaEye />}
//             </div>
//           </div>

//           <div className="relative mb-[44px]">
//             <Input
//               onChange={handleInputChange}
//               value={passwordData.newPassword}
//               name="newPassword"
//               type={showNewPassword ? "text" : "password"}
//               placeholder="Enter New Password"
//             />
//             <div
//               className="top-1/2 right-3 absolute transform -translate-y-1/2 cursor-pointer"
//               onClick={() => setShowNewPassword(!showNewPassword)}
//             >
//               {showNewPassword ? <FaEyeSlash /> : <FaEye />}
//             </div>
//           </div>

//           <div className="relative mb-[44px]">
//             <Input
//               onChange={handleConfirmPasswordChange}
//               value={confirmPassword}
//               name="confirmPassword"
//               type={showConfirmPassword ? "text" : "password"}
//               placeholder="Confirm Password"
//               className={passwordMismatchError ? "border-red-500" : ""}
//             />
//             <div
//               className="top-1/2 right-3 absolute transform -translate-y-1/2 cursor-pointer"
//               onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//             >
//               {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
//             </div>
//             {passwordMismatchError && (
//               <p className="mt-1 text-red-500 text-xs">Passwords do not match</p>
//             )}
//           </div>

//           <Button type="submit" className="rounded-[8px] w-full h-[45px]">
//             Change Password
//           </Button>
//         </form>
//       </div>
//     </section>
//   );
// };

// export default ChangePassword;

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
  const [passwordMismatchError, setPasswordMismatchError] = useState(false);
  const [oldPasswordError, setOldPasswordError] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Client-side validation
    if (passwordData.newPassword !== confirmPassword) {
      setPasswordMismatchError(true);
      return;
    }

    // Server-side validation handled by usePasswordChange hook
    passwordChange.mutate(passwordData);
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
    setPasswordMismatchError(false); // Reset mismatch error on change
  };

  const handleOldPasswordBlur = () => {
    // Perform old password validation here (can be server-side validation)
    // For demonstration purposes, let's assume a simple check on client-side
    if (passwordData.oldPassword !== "correct_old_password") {
      setOldPasswordError(true);
    } else {
      setOldPasswordError(false);
    }
  };

  useEffect(() => {
    if (passwordChange.isSuccess) {
      Swal.fire({
        icon: "success",
        title: "Password Updated",
        showConfirmButton: false,
        timer: 1500,
      });
      setPasswordData({ oldPassword: "", newPassword: "" });
    }
  }, [passwordChange.isSuccess]);

  useEffect(() => {
    if (passwordChange.isError) {
      Swal.fire({
        icon: "error",
        title: "Your Password is not change",
        showConfirmButton: false,
        timer: 1500,
      });
      setPasswordData({ oldPassword: "", newPassword: "" });
    }
  }, [passwordChange.isError]);

  return (
    <section className="flex items-center justify-center w-full">
      <div className="flex flex-col  md:w-[544px] gap-3 w-full p-6">
        <h1 className="font-bold text-center text-md md:text-2xl ">
          Change Your Password
        </h1>
        <p className="text-[12px] md:text-sm  font-normal text-center text-slate-500">
          The new password you set must be different to the previous one
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 py-4 md:gap-8"
        >
          <div className="relative ">
            <Input
              onChange={handleInputChange}

              name="oldPassword"
              type={showOldPassword ? "text" : "password"}
              placeholder="Enter Old Password"
              className={oldPasswordError ? "border-red-500" : "h-10 md:h-auto md:placeholder:text-md md:text-md text-[13px] placeholder:text-[13px]"}
            />
            <div
              className="absolute transform -translate-y-1/2 cursor-pointer top-1/2 right-3"
              onClick={() => setShowOldPassword(!showOldPassword)}
            >
              {showOldPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
            {oldPasswordError && (
              <p className="mt-1 text-red-500 text-xs">Old password is incorrect</p>
            )}
          </div>

          <div className="relative ">
            <Input
              onChange={handleInputChange}
              className="h-10 md:h-auto md:placeholder:text-md md:text-md text-[13px] placeholder:text-[13px]"
              value={passwordData.newPassword}
              name="newPassword"
              type={showNewPassword ? "text" : "password"}
              placeholder="Enter New Password"
            />
            <div
              className="absolute transform -translate-y-1/2 cursor-pointer top-1/2 right-3"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          <div className="relative ">
            <Input
              onChange={handleConfirmPasswordChange}
              className="h-10 md:h-auto md:placeholder:text-md md:text-md text-[13px] placeholder:text-[13px]"
              value={confirmPassword}
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className={passwordMismatchError ? "border-red-500" : ""}
            />
            <div
              className="absolute transform -translate-y-1/2 cursor-pointer top-1/2 right-3"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
            {passwordMismatchError && (
              <p className="mt-1 text-red-500 text-xs">Passwords do not match</p>
            )}
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

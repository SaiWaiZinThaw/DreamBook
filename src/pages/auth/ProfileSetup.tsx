import { LogoWhite } from "@/assets";
import { FileUpload } from "@/components/ui/FileUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { countryCodes } from "@/variables";

const ProfileSetup = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <div className="flex flex-col items-center">
      <img src={LogoWhite} alt="LogoWhite" className="mb-16 w-[280px]" />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-8 w-[460px] font-Inter"
      >
        <h1 className="font-bold text-2xl text-white">Create an account</h1>
        <FileUpload />

        <div className="flex items-center gap-5 w-full">
          <select className="flex justify-center items-center p-4 rounded-[5px] h-12">
            {countryCodes.map((code, index) => (
              <option key={index} value={code}>
                {code}
              </option>
            ))}
          </select>
          <Input type="number" id="phone" placeholder="Phone" />
        </div>
        <Input type="text" id="name" placeholder="Full Name" />

        <select className="flex justify-center items-center p-4 rounded-[5px] w-full h-12 text-sm">
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <textarea
          name="bio"
          id="bio"
          className="placeholder:opacity-70 p-4 rounded-[5px] w-full placeholder:text-black"
          placeholder="Bio"
        ></textarea>

        <Button variant={"default"} size={"full"} text={"white"}>
          Create an Account
        </Button>
      </form>
    </div>
  );
};

export default ProfileSetup;

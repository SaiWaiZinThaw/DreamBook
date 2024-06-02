import { LogoWhite } from "@/assets";
import { FileUpload } from "@/components/ui/FileUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { countryCodes } from "@/variables";
import { NavLink, useNavigate } from "react-router-dom";
import { useProfileSetup } from "@/hooks/useAuth";
import { ProfileSetupData } from "@/types/types";
import { useGetMe } from "@/hooks/useUser";
import { ButtonLoading } from "@/components/ui/loading-button";

const ProfileSetup = () => {
  const profileSetup = useProfileSetup();
  const [countryCode, setCountryCode] = useState("+95");
  const [phoneNo, setPhoneNo] = useState("9794988331");
  const { data } = useGetMe();

  const navigate = useNavigate();

  const [profileData, setProfileData] = useState<ProfileSetupData>({
    name: "",
    profilePicture: undefined,
    phoneNumber: `${countryCode}${phoneNo}`,
    bio: "",
    gender: "",
  });

  useEffect(() => {
    if (data) {
      setProfileData((prev) => ({
        ...prev,
        name: data.name || "",
        bio: data.bio || "",
        gender: data.gender || "",
      }));
    }
  }, [data]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    profileSetup.mutate(profileData);
  };

  useEffect(() => {
    if (profileSetup.isSuccess) {
      navigate("/");
    }
  }, [profileSetup.isSuccess]);

  const handleFileChange = (file: File) => {
    setProfileData((prev) => ({
      ...prev,
      profilePicture: file,
    }));
  };

  return (
    <div className="flex flex-col items-center">
      <NavLink to={"/"}>
        <img src={LogoWhite} alt="LogoWhite" className="mb-16 w-[280px]" />
      </NavLink>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-8 w-[460px] font-Inter"
      >
        <h1 className="font-bold text-2xl text-white">Create an account</h1>
        <FileUpload onFileChange={handleFileChange} />

        <div className="flex items-center gap-5 w-full">
          <select
            className="flex justify-center items-center p-4 rounded-[5px] h-12"
            value={countryCode}
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
              setCountryCode(event.target.value);
            }}
          >
            {countryCodes.map((code, index) => (
              <option key={index} value={code}>
                {code}
              </option>
            ))}
          </select>
          <Input
            type="tel"
            id="phone"
            placeholder="Phone"
            value={phoneNo}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setPhoneNo(event.target.value);
            }}
          />
        </div>
        <Input
          type="text"
          id="name"
          placeholder="Full Name"
          value={profileData.name}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setProfileData((prev) => ({
              ...prev,
              name: event.target.value,
            }));
          }}
        />

        <select
          className="flex justify-center items-center p-4 rounded-[5px] w-full h-12 text-sm"
          value={profileData.gender}
          onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
            console.log(profileData);
            setProfileData((prev) => ({
              ...prev,
              gender: event.target.value,
            }));
          }}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <textarea
          name="bio"
          id="bio"
          className="placeholder:opacity-70 p-4 rounded-[5px] w-full placeholder:text-black"
          placeholder="Bio"
          value={profileData.bio}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
            setProfileData((prev) => ({
              ...prev,
              bio: event.target.value,
            }));
          }}
        ></textarea>

        {!profileSetup.isPending ? (
          <Button variant={"default"} size={"full"} text={"white"}>
            Create an Account
          </Button>
        ) : (
          <ButtonLoading />
        )}
      </form>
    </div>
  );
};

export default ProfileSetup;

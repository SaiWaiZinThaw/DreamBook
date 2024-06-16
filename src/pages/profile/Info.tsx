import { FileUpload } from "@/components/ui/FileUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { countryCodes } from "@/variables";
import { useProfileSetup } from "@/hooks/useAuth";
import { ProfileSetupData } from "@/types/types";
import { useGetMe } from "@/hooks/useUser";
import { ButtonLoading } from "@/components/ui/loading-button";
import { getToken } from "@/services/authService";
import { Label } from "@/components/ui/label";
import Swal from "sweetalert2";

const Info = () => {
  const profileSetup = useProfileSetup();
  const token = getToken() || "";
  const { data } = useGetMe(token);

  const [profileData, setProfileData] = useState<ProfileSetupData>({
    name: "",
    profilePicture: undefined,
    countryCode: "+95",
    localNumber: "",
    bio: "",
    gender: "male",
  });

  useEffect(() => {
    if (data) {
      setProfileData((prev) => ({
        ...prev,
        name: data.name || "",
        bio: data.bio || "",
        gender: data.gender || "",
        localNumber: data.localNumber || "",
        countryCode: data.countryCode || "",
      }));
    }
  }, [data]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    profileSetup.mutate(profileData);
  };

  useEffect(() => {
    if (profileSetup.isSuccess) {
      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }, [profileSetup.isSuccess]);

  const handleFileChange = (file: File) => {
    setProfileData((prev) => ({
      ...prev,
      profilePicture: file,
    }));
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div className="flex flex-col items-center pb-10">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-6 w-[460px] font-Inter"
        >
          <h1 className="text-2xl font-bold text-white">Create an account</h1>
          <FileUpload onFileChange={handleFileChange} />
          <Label htmlFor="picture" className="text-black font-Inter">
            Upload Photo
          </Label>
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
          <div className="bg-white p-4 border border-border rounded-[5px] w-full h-12 font-Inter font-semibold text-secondary-foreground text-sm text-opacity-50">
            {data!.email}
          </div>
          <div className="flex items-center w-full gap-5">
            <select
              className="flex justify-center items-center p-4 rounded-[5px] h-12"
              value={profileData.countryCode}
              onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                setProfileData((prev) => ({
                  ...prev,
                  countryCode: event.target.value,
                }));
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
              value={profileData.localNumber}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setProfileData((prev) => ({
                  ...prev,
                  localNumber: event.target.value,
                }));
              }}
            />
          </div>

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
            <option value="rather not to say">Rather not to say</option>
          </select>

          <textarea
            name="bio"
            id="bio"
            className="placeholder:opacity-70 p-4 border border-border rounded-[5px] w-full placeholder:text-black"
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
              Update Profile
            </Button>
          ) : (
            <ButtonLoading />
          )}
        </form>
      </div>
    </div>
  );
};

export default Info;

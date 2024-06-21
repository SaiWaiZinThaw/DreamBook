import { FileUpload } from "@/components/ui/FileUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
import { countryCodes } from "@/variables";
import { useNavigate } from "react-router-dom";
import { useProfileSetup } from "@/hooks/useAuth";
import { ProfileSetupData } from "@/types/types";
import { useGetMe } from "@/hooks/useUser";
import { ButtonLoading } from "@/components/ui/loading-button";
import { getToken } from "@/services/authService";

const ProfileSetup = () => {
  const profileSetup = useProfileSetup();
  const token = getToken() || "";
  const { data } = useGetMe(token);

  const navigate = useNavigate();

  const [profileData, setProfileData] = useState<ProfileSetupData>({
    name: "",
    profilePicture: undefined,
    countryCode: "+95",
    localNumber: "",
    bio: "",
    gender: "male",
  });

  const [errors, setErrors] = useState<{ name?: string; localNumber?: string }>({});

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
    
    const validationErrors: {name?: string; localNumber?: string} = {};
    if(!profileData.name) {
      validationErrors.name = "* Fill Your Username"
    }else if(profileData.name.length > 25){
      validationErrors.name = "Username must be maximum 25 characters !"
    }

    setErrors(validationErrors);

    if(Object.keys(validationErrors).length === 0) {
      profileSetup.mutate(profileData, {
        onError: (error:any) => {
          if(error.response && error.response.data){
            setErrors(error.response.data.errors)
          }
        }
      });

    }
  };

  useEffect(() => {
    if (profileSetup.isSuccess) {
      console.log(profileSetup.data);
      navigate("/auth/select-category");
    }
  }, [profileSetup.isSuccess]);

  const handleFileChange = (file: File) => {
    setProfileData((prev) => ({
      ...prev,
      profilePicture: file,
    }));
  };

  return (
    <div className="flex flex-col items-center pb-10">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-6 w-[460px] font-Inter"
      >
        <h1 className="font-bold text-2xl text-white">Create an account</h1>
        <FileUpload onFileChange={handleFileChange} />
        <Label htmlFor="picture" className="font-Inter text-lg text-white">
          Upload Photo
        </Label>
        <div className="flex items-center gap-5 w-full">
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
          {errors.localNumber && (
          <p className="text-red-500 text-sm">{errors.localNumber}</p>
        )}
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
         {errors.name && (
          <p className="text-red-500 text-sm">{errors.name}</p>
        )}
        <select
          className="flex justify-center items-center p-4 rounded-[5px] w-full h-12 text-sm"
          value={profileData.gender}
          onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
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

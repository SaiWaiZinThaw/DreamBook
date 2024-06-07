import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { useGetMe } from "@/hooks/useUser";
import { getToken } from "@/services/authService";

interface FileUploadProps {
  onFileChange: (file: File) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileChange }) => {
  const token = getToken() || "";
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { data, isLoading } = useGetMe(token);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImagePreview(URL.createObjectURL(file));
      onFileChange(file);
    }
  };

  return (
    <div className="flex flex-col items-center max-w-sm gap-3">
      <div className="relative">
        <Input
          id="picture"
          type="file"
          className="absolute top-0 left-0 w-full h-full text-white rounded-full opacity-0 cursor-pointer hover:opacity-20"
          onChange={handleFileChange}
        />
        {!isLoading ? (
          <div
            className="flex justify-center items-center border-[2px] bg-gray-200 border-blue-500 rounded-full w-[100px] h-[100px]"
            style={{
              backgroundImage: imagePreview
                ? `url(${imagePreview})`
                : data && data.profilePicture
                ? `url(${data.profilePicture})`
                : "",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        ) : (
          <div className="flex justify-center items-center border-[2px] bg-gray-200 border-blue-500 rounded-full w-[100px] h-[100px]"></div>
        )}
      </div>
    </div>
  );
};

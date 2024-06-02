import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGetMe } from "@/hooks/useUser";

interface FileUploadProps {
  onFileChange: (file: File) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileChange }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { data, isLoading } = useGetMe();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImagePreview(URL.createObjectURL(file));
      onFileChange(file);
    }
  };

  return (
    <div className="flex flex-col items-center gap-3 max-w-sm">
      <div className="relative">
        <Input
          id="picture"
          type="file"
          className="top-0 left-0 absolute opacity-0 hover:opacity-20 rounded-full w-full h-full text-white cursor-pointer"
          onChange={handleFileChange}
        />
        {!isLoading && (
          <div
            className="flex justify-center items-center border-[2px] bg-gray-200 hover:bg-opacity-25 border-blue-500 rounded-full w-[100px] h-[100px]"
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
        )}
      </div>
      <Label htmlFor="picture" className="font-Inter text-white">
        Upload Photo
      </Label>
    </div>
  );
};

import React, { useState } from "react";
import { Input } from "@/components/ui/input";

interface FileUploadProps {
  onFileChange: (file: File) => void;
  coverImage?: string | null;
}

export const BookCoverChange: React.FC<FileUploadProps> = ({
  onFileChange,
  coverImage,
}) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

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
          className="absolute top-0 left-0 w-full h-full text-white opacity-0 cursor-pointer hover:opacity-20"
          onChange={handleFileChange}
        />
        {coverImage ? (
          <div
            className="flex justify-center items-center mx-[52.5px] my-[30px] w-[127px] h-[191px]"
            style={{
              backgroundImage: imagePreview
                ? `url(${imagePreview})`
                : coverImage && coverImage
                ? `url(${coverImage})`
                : "",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        ) : (
          <div className="flex justify-center items-center mx-[52.5px] my-[30px] w-[127px] h-[191px]"></div>
        )}
      </div>
    </div>
  );
};

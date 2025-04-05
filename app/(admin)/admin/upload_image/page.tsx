"use client";

import useUpload from "@/app/hooks/use-upload";
import { ChangeEvent } from "react";

export default function Page() {
  const {
    state: { uploadedUrl },
    uploadFile,
  } = useUpload("image");

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      const file = files[0];
      uploadFile(file);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-3xl font-bold uppercase">Upload Image</h3>
      <label
        htmlFor="image_upload"
        className="mt-5 flex aspect-square w-72 cursor-pointer items-center justify-center border border-dashed"
      >
        <input
          type="file"
          onChange={onChange}
          id="image_upload"
          className="hidden"
        />
        <span className="text-center">click</span>
      </label>

      <span>{uploadedUrl}</span>
    </div>
  );
}

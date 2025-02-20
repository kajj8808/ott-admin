"use client";

import { useEffect, useState } from "react";

export default function useUpload(mediaType: string) {
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [uploadedId, setUploadedId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [maxUploads, setMaxUploads] = useState(0);
  const [uploadedCount, setUploadedCount] = useState(0);

  const uploadFile = async (file: File) => {
    setIsLoading(true);

    const chunkSize = 1024 * 1024 * 5; // 5MB chunk size
    const totalChunks = Math.ceil(file.size / chunkSize);
    setMaxUploads(totalChunks);
    const chunkInfos: {
      start: number;
      end: number;
      fileIndex: number;
    }[] = [];
    for (let i = 0; i < totalChunks; i++) {
      const start = i * chunkSize;
      const end = Math.min(start + chunkSize, file.size);

      chunkInfos.push({
        start: start,
        end: end,
        fileIndex: i,
      });
    }

    const maxConcurrentUploads = 10;
    let activeUploads = 0;

    const uploadChunkInfo = async (
      chunkInfo: (typeof chunkInfos)[0],
      mediaType: string,
    ) => {
      const formData = new FormData();
      const blob = file.slice(chunkInfo.start, chunkInfo.end);
      formData.append("fileName", file.name);
      formData.append("fileIndex", chunkInfo.fileIndex.toString());
      formData.append("chunks", totalChunks.toString());
      formData.append("blob", blob);
      formData.append("mediaType", mediaType);

      activeUploads++;
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/file-upload/upload`,
          {
            method: "POST",
            body: formData,
          },
        );
        if (!response.ok) {
          throw new Error(`Upload failed with status ${response.status}`);
        }
        const json = await response.json();
        if (json.fileName) {
          setUploadedId(`${json.fileName}`);
        }
      } finally {
        activeUploads--;
        setUploadedCount((prev) => prev + 1);
      }
    };

    while (true) {
      if (activeUploads < maxConcurrentUploads) {
        const chunkInfo = chunkInfos.pop();
        console.log(chunkInfo);
        if (chunkInfo) {
          uploadChunkInfo(chunkInfo, mediaType).catch(console.error);
        } else {
          setIsLoading(false);
          break;
        }
      } else {
        await new Promise((resolve) => setTimeout(resolve, 250));
        continue;
      }
    }
  };

  const reset = () => {
    setUploadedId(null);
  };

  useEffect(() => {
    if (uploadedId && mediaType) {
      setUploadedUrl(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/${mediaType}/${uploadedId}`,
      );
    }
  }, [uploadedId, mediaType]);

  return {
    state: { uploadedId, isLoading, uploadedUrl, maxUploads, uploadedCount },
    uploadFile,
    reset,
  };
}

"use client";

import { useEffect, useState } from "react";

interface ChunkInfo {
  start: number;
  end: number;
  fileIndex: number;
}

export default function useUpload(mediaType: string) {
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [uploadedId, setUploadedId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [maxUploads, setMaxUploads] = useState(0);
  const [uploadedCount, setUploadedCount] = useState(0);

  const [chunkInfos, setChunkInfos] = useState<ChunkInfo[] | null>(null);

  const [file, setFile] = useState<File | null>(null);

  const [error, setError] = useState<string | null>(null);

  const uploadFile = async (file: File) => {
    setIsLoading(true);
    setFile(file);
    const chunkSize = 1024 * 1024 * 30; // 30MB chunk size
    const totalChunks = Math.ceil(file.size / chunkSize);

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

    setChunkInfos(chunkInfos);

    setMaxUploads(chunkInfos.length);

    /* const uploadChunkInfo = async (
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
    }; */

    /*  while (true) {
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
    } */
  };

  const reset = () => {
    setUploadedId(null);
  };

  useEffect(() => {
    const uploadChunks = async () => {
      if (!chunkInfos || !file) return;

      for (let i = 0; i < Math.ceil(chunkInfos.length / 10); i++) {
        const slicedChunkInfos = chunkInfos.slice(i * 10, (i + 1) * 10);
        await Promise.all(
          slicedChunkInfos.map(async (chunkInfo) => {
            const formData = new FormData();
            const blob = file.slice(chunkInfo.start, chunkInfo.end);
            formData.append("fileName", file.name);
            formData.append("fileIndex", chunkInfo.fileIndex.toString());
            formData.append("chunks", chunkInfos.length.toString());
            formData.append("blob", blob);
            formData.append("mediaType", mediaType);

            const controller = new AbortController();
            const timeout = setTimeout(
              () => controller.abort(),
              60 * 60 * 1000,
            ); // 60분 대기
            try {
              const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/file-upload/upload`,
                {
                  method: "POST",
                  body: formData,
                  signal: controller.signal,
                },
              );
              if (!response.ok) {
                throw new Error(`Upload failed with status ${response.status}`);
              }
              setUploadedCount((prev) => prev + 1);
              const json = await response.json();
              if (json.fileName) {
                setUploadedId(`${json.fileName}`);
              }
            } catch (error) {
              if (typeof error === "string") {
                setError(error);
              }
            } finally {
              clearTimeout(timeout);
            }
          }),
        );
      }
    };

    uploadChunks();
  }, [chunkInfos, file]);

  useEffect(() => {
    if (uploadedId && mediaType) {
      setUploadedUrl(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/${mediaType}/${uploadedId}`,
      );
    }
  }, [uploadedId, mediaType]);

  return {
    state: {
      uploadedId,
      isLoading,
      uploadedUrl,
      maxUploads,
      uploadedCount,
      error,
    },
    uploadFile,
    reset,
  };
}

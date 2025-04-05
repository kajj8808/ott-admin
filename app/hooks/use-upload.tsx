"use client";

import { useEffect, useState } from "react";

interface ChunkInfo {
  start: number;
  end: number;
  fileIndex: number;
}

type MediaType = "video" | "image";

export default function useUpload(mediaType: MediaType) {
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
    const chunkSize = 1024 * 1024 * 15; // 15MB chunk size
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
      // 서버의 부담을 줄이기 위해 한번에 10개씩만 보냄.
      for (let i = 0; i < Math.ceil(chunkInfos.length / 10); i++) {
        const slicedChunkInfos = chunkInfos.slice(i * 10, (i + 1) * 10);
        await Promise.all(
          slicedChunkInfos.map(async (chunkInfo) => {
            try {
              const formData = new FormData();
              const blob = file.slice(chunkInfo.start, chunkInfo.end);
              formData.append("fileName", file.name);
              formData.append("fileIndex", chunkInfo.fileIndex.toString());
              formData.append("chunks", chunkInfos.length.toString());
              formData.append("blob", blob);
              formData.append("mediaType", mediaType);

              while (true) {
                const response = await fetch(
                  `${process.env.NEXT_PUBLIC_BACKEND_URL}/file-upload/upload`,
                  {
                    method: "POST",
                    body: formData,
                  },
                ).catch((e) => {
                  console.error("Fetch error: ", e);
                  return null; // 에러 발생 시 null 반환
                });

                if (!response) {
                  console.error("Network error, retrying...");
                  continue;
                }

                // 업로드가 성공하지 않는 경우 계속 반복합니다.
                const json = await response.json();
                if (!json.ok || response.status === 502) {
                  continue;
                } else {
                  setUploadedCount((prev) => prev + 1);
                  if (json.fileName) {
                    setUploadedId(`${json.fileName}`);
                  }
                  break;
                }
              }
            } catch (error) {
              if (typeof error === "string") {
                setError(error);
              }
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

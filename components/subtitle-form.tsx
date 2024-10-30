"use client";

import { ChangeEvent, useActionState, useState } from "react";
import Button from "./button";
import {
  addSubtitle,
  subtitleTextToVttText,
} from "@/app/admin/episode/add/subtitle/actions";

interface SubtitleFormProps {
  episodeId: number;
  title: string;
  videoUrl: string;
  videoId: string;
}

export default function SubtitleForm({
  episodeId,
  title,
  videoUrl,
  videoId,
}: SubtitleFormProps) {
  const [state, action] = useActionState(addSubtitle, null);

  const [vttUrl, setVttUrl] = useState<null | string>(null);
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const subtitleFile = e.target.files[0];
    const filename = subtitleFile.name;
    if (filename.includes(".smi") || filename.includes(".ass")) {
      const render = new FileReader();
      // onload 이벤트 등록
      render.onload = async (e) => {
        const smiContent = e.target?.result as string;
        const vttContent = await subtitleTextToVttText(
          smiContent,
          subtitleFile.name,
        );
        // blob 형식으로 vtt를 바로 사용가능하게 수정
        const blob = new Blob([vttContent], { type: "text/vtt" });
        const url = URL.createObjectURL(blob); // 가상 url
        setVttUrl(url);
      };
      // onload 이벤트 실행
      render.readAsText(subtitleFile, "euc-kr");
    }
  };

  return (
    <form
      action={action}
      className="flex w-full max-w-md flex-col gap-2 border p-2"
    >
      <h3 className="line-clamp-1">{title}</h3>
      {vttUrl ? (
        <video
          controls
          className="flex aspect-video items-center justify-center border border-dashed"
        >
          <source src={videoUrl} type="video/mp4" />
          <track
            src={vttUrl}
            kind="subtitles"
            srcLang="kr"
            label="한국어"
            default
          />
        </video>
      ) : null}
      <label
        htmlFor={`${episodeId}`}
        className={`flex aspect-square items-center justify-center border border-dashed ${vttUrl ? "hidden" : ""}`}
      >
        <span>subtitle file here</span>
      </label>
      <input
        type="file"
        name="subtitle"
        id={`${episodeId}`}
        className="hidden"
        onChange={onChange}
      />
      <div className="hidden">
        <input type="text" name="episode_id" defaultValue={episodeId} />
        <input type="text" name="video_id" defaultValue={videoId} />
      </div>
      <span className="text-xs text-red-600">{state?.formErrors}</span>
      <label htmlFor="isOverlap" className="flex gap-2">
        <input type="checkbox" name="is_overlap" id="isOverlap" />
        <span>ass 자막 입히기</span>
      </label>

      <Button text="add subtitle" />
    </form>
  );
}

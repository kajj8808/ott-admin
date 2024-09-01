"use client";

import {
  addSubtitle,
  subtitleTextToVttText,
} from "@/app/admin/episode/subtitle/add/actions";
import { FolderPlusIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { ChangeEvent, useState } from "react";
import { useFormState } from "react-dom";

interface AddSubtitleForm {
  episodeId: number;
  episodeTitle: string;
  seriesTitle: string;
  videoUrl: string;
}
export default function AddSubtitleForm({
  episodeId,
  episodeTitle,
  seriesTitle,
  videoUrl,
}: AddSubtitleForm) {
  const [state, action] = useFormState(addSubtitle, null);
  const [vttUrl, setVttUrl] = useState<undefined | string>(undefined);

  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const subtitleFile = e.target.files[0];
    if (
      subtitleFile.name.includes(".smi") ||
      subtitleFile.name.includes(".ass")
    ) {
      const render = new FileReader();
      // onload 이벤트 등록
      render.onload = async (e) => {
        const smiContent = e.target?.result as string;
        const vttContent = await subtitleTextToVttText(
          smiContent,
          subtitleFile.name
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
      key={episodeId}
      className="border p-3 rounded-xl last:mb-3"
    >
      <div>
        <div className="flex flex-col gap-px">
          <h3>{seriesTitle}</h3>
          <h4 className="text-sm">{episodeTitle}</h4>
        </div>
        <div className="flex">
          <label htmlFor={`subtitle_${episodeId}`} className="cursor-pointer">
            <FolderPlusIcon className="size-8" />
          </label>
        </div>
        <input
          type="file"
          name={`subtitle_${episodeId}`}
          id={`subtitle_${episodeId}`}
          className="hidden"
          onChange={onChange}
        />
        <button>
          <PaperAirplaneIcon className="size-8" />
        </button>
      </div>
      <div>
        {vttUrl ? (
          <video controls>
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
      </div>
    </form>
  );
}
/* */

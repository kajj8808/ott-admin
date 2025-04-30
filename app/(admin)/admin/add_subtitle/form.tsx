"use client";

import {
  ChangeEvent,
  useActionState,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  addSubtitle,
  NonSubtitleVideoConent,
  subtitleTextToVttText,
} from "./action";
import Button from "@/components/button";
import Form from "@/components/ui/admin-form";

interface SubtitleFormProps {
  videoContent: NonSubtitleVideoConent;
}
export default function SubtitleForm({ videoContent }: SubtitleFormProps) {
  const [state, action, pending] = useActionState(addSubtitle, null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [vttUrl, setVttUrl] = useState<null | string>(null);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const subtitleFile = e.target.files[0];
    const filename = subtitleFile.name;
    if (
      filename.includes(".smi") ||
      filename.includes(".ass") ||
      filename.includes(".vtt") ||
      filename.includes(".srt")
    ) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const subtitleContent = e.target?.result as string;
        const vttContent = await subtitleTextToVttText(
          subtitleContent,
          subtitleFile.name,
        );
        const blob = new Blob([vttContent], { type: "text/vtt" });
        const url = URL.createObjectURL(blob); // 가상 파일 url (브라우저에 있음)
        setVttUrl(url);
      };
      // euc - kr 이 아닌 경우 깨지는 파일이 많은 관계로..
      reader.readAsText(subtitleFile, "utf-8");
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = 0.2;
    }
  }, [videoRef, vttUrl]);

  return (
    <Form action={action} subTitle="Add Subtitle">
      <div>
        <h4 className="text-base font-medium">{videoContent.series?.title}</h4>
        <span className="text-neutral-400">
          {videoContent.season?.name} 제{videoContent.episode?.episode_number}화
          {videoContent.episode?.name}
        </span>
      </div>

      <input type="text" name="file" id="file" className="hidden" />
      <label
        htmlFor={videoContent.id + ""}
        className={`mt-1 flex aspect-video items-center justify-center border border-dashed`}
      >
        {vttUrl ? (
          <div className="flex flex-col">
            <video ref={videoRef} controls autoPlay crossOrigin="anonymous">
              <source
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/media/video/${videoContent.watch_id}`}
                type="video/mp4"
              />
              <track
                src={vttUrl}
                kind="subtitles"
                srcLang="kr"
                label="한국어"
                default
              />
            </video>
            <div className="p-2">
              <label>
                <input type="checkbox" name="is_overlap" id="is_overlap" /> is
                <span>overlap</span>
              </label>
            </div>
            <Button text="add subtitle" pending={pending} />
            <input
              type="text"
              id="video_content_id"
              name="video_content_id"
              className="hidden"
              defaultValue={videoContent.id}
            />
          </div>
        ) : null}
        <span className={`${vttUrl ? "hidden" : ""}`}>subtitle file here</span>
        <input
          type="file"
          name="subtitle"
          id={videoContent.id + ""}
          className="hidden"
          onChange={onChange}
        />
      </label>
      {state?.fieldErrors ? (
        <span className="text-sm text-red-500">
          {Object.values(state.fieldErrors).flat().join(" ")}
        </span>
      ) : null}
    </Form>
  );
}

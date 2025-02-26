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
  NonSubtitleEpisode,
  subtitleTextToVttText,
} from "./action";
import Button from "@/app/components/button";
import Form from "@/app/components/ui/admin-form";

interface SubtitleFormProps {
  episode: NonSubtitleEpisode;
}
export default function SubtitleForm({ episode }: SubtitleFormProps) {
  const [state, action, pending] = useActionState(addSubtitle, null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [vttUrl, setVttUrl] = useState<null | string>(null);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const subtitleFile = e.target.files[0];
    const filename = subtitleFile.name;
    if (filename.includes(".smi") || filename.includes(".ass")) {
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
      reader.readAsText(subtitleFile, "euc-kr");
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
        <h4 className="text-base font-medium">{episode.series.title}</h4>
        <span className="text-neutral-400">
          {episode.season.name} 제{episode.number}화 {episode.title}
        </span>
      </div>

      <input type="text" name="file" id="file" className="hidden" />
      <label
        htmlFor={episode.id}
        className={`mt-1 flex aspect-video items-center justify-center border border-dashed`}
      >
        {vttUrl ? (
          <div className="flex flex-col">
            <video ref={videoRef} controls autoPlay crossOrigin="anonymous">
              <source
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/video/${episode.video_id}`}
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
              id="episode_id"
              name="episode_id"
              className="hidden"
              defaultValue={episode.id}
            />
          </div>
        ) : null}
        <span className={`${vttUrl ? "hidden" : ""}`}>subtitle file here</span>
        <input
          type="file"
          name="subtitle"
          id={episode.id}
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

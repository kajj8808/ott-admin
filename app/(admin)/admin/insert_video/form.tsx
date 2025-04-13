"use client";

import { ChangeEvent, useActionState, useState } from "react";
import { Season } from "../add_nyaa/action";
import { insertEpisode, insertMovie } from "./action";
import useUpload from "@/app/hooks/use-upload";
import Input from "@/components/input";
import Button from "@/components/button";
import Form from "@/components/ui/admin-form";

interface VideoFormProps {
  seasons: Season[];
}
export default function VideoForm({ seasons }: VideoFormProps) {
  const [isMovieMode, setIsMovieMode] = useState(true);

  const [movieState, movieAction, moviePending] = useActionState(
    insertMovie,
    null,
  );

  const [episodeState, episodeAction, episodePending] = useActionState(
    insertEpisode,
    null,
  );

  const {
    uploadFile: uploadVideo,
    state: videoUploadState,
    reset: resetVideoUrl,
  } = useUpload("video");

  const {
    uploadFile: uploadPost,
    state: postUploadState,
    reset: resetPostUrl,
  } = useUpload("image");

  const {
    uploadFile: uploadThumbnail,
    state: thumbnailUploadState,
    reset: resetThumbnailUrl,
  } = useUpload("image");

  const onVideoChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      await uploadVideo(file);
    }
  };

  const onThumbnailChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      await uploadThumbnail(file);
    }
  };

  const onPosterChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      await uploadPost(file);
    }
  };

  return (
    <>
      {isMovieMode ? (
        <Form action={movieAction} subTitle="Movie">
          <Input id="series_id" name="seriesId" placeholder="series_id" />
          <Input id="title" name="title" placeholder="title" />
          <Input
            id="description"
            name="description"
            placeholder="description"
          />
          <Input
            id="running_time"
            name="running_time"
            placeholder="running_time"
          />
          {videoUploadState.uploadedUrl && (
            <div>
              <span>{videoUploadState.uploadedId}</span>
              <input
                type="text"
                className="hidden"
                name="video"
                defaultValue={videoUploadState.uploadedId!}
              />
            </div>
          )}
          <label
            htmlFor="video_file"
            className={`border p-4 text-center disabled:opacity-50 ${videoUploadState.uploadedUrl && "hidden"}`}
          >
            <input
              type="file"
              id="video_file"
              className="hidden"
              onChange={onVideoChange}
              accept="video/mp4,video/avi,video/mov,video/wmv,video/flv,video/webm,video/mkv,.mkv"
              maxLength={1}
              disabled={videoUploadState.isLoading}
            />
            {videoUploadState.isLoading ? (
              <span>
                {videoUploadState.uploadedCount}/{videoUploadState.maxUploads}
              </span>
            ) : (
              <span>video_file</span>
            )}
          </label>
          {postUploadState.uploadedUrl && (
            <div>
              <img
                src={postUploadState.uploadedUrl}
                crossOrigin="anonymous"
                alt={postUploadState.uploadedUrl}
              />
              <input
                type="text"
                className="hidden"
                defaultValue={postUploadState.uploadedId!}
                name="poster"
              />
            </div>
          )}
          <label
            htmlFor="poster_file"
            className={`border p-4 text-center ${postUploadState.uploadedUrl && "hidden"}`}
          >
            <input
              type="file"
              id="poster_file"
              className="hidden"
              onChange={onPosterChange}
            />
            <span>poster_file</span>
          </label>
          {thumbnailUploadState.uploadedUrl && (
            <div>
              <img
                src={thumbnailUploadState.uploadedUrl}
                crossOrigin="anonymous"
                alt={thumbnailUploadState.uploadedUrl}
              />
              <input
                type="text"
                className="hidden"
                defaultValue={thumbnailUploadState.uploadedId!}
                name="still_path"
              />
            </div>
          )}
          <label
            htmlFor="still_path"
            className={`border p-4 text-center ${thumbnailUploadState.uploadedUrl && "hidden"}`}
          >
            <input
              type="file"
              id="still_path"
              className="hidden"
              onChange={onThumbnailChange}
            />
            <span>thumnail_file</span>
          </label>
          <Button text="Send Movie" pending={moviePending} />
          {movieState?.errors ? (
            <span className="text-sm text-red-500">
              {movieState.errors.formErrors.join(" ")}
            </span>
          ) : null}
        </Form>
      ) : (
        <Form action={episodeAction} subTitle="Episode">
          <select
            name="season_id"
            className="rounded-sm p-3 text-center text-lg font-semibold text-neutral-900"
          >
            {seasons.map((season) => (
              <option key={season.id} value={season.id} className="w-5">
                {season.series.title} {season.name}
              </option>
            ))}
          </select>

          <Input id="title" name="title" placeholder="title" />
          <Input
            id="description"
            name="description"
            placeholder="description"
          />
          <Input
            id="running_time"
            name="running_time"
            placeholder="running_time"
          />
          <Input id="number" name="number" placeholder="number" />
          {videoUploadState.uploadedUrl && (
            <div>
              <video controls crossOrigin="anonymous">
                <source src={videoUploadState.uploadedUrl} />
              </video>
              <input
                type="text"
                className="hidden"
                name="video"
                defaultValue={videoUploadState.uploadedId!}
              />
            </div>
          )}
          <label
            htmlFor="video_id"
            className={`border p-4 text-center ${videoUploadState.uploadedUrl && "hidden"}`}
          >
            <input
              type="file"
              id="video_id"
              className="hidden"
              onChange={onVideoChange}
            />
            {videoUploadState.isLoading ? (
              <span>
                {videoUploadState.uploadedCount}/{videoUploadState.maxUploads}
              </span>
            ) : (
              <span>video_file</span>
            )}
          </label>

          {thumbnailUploadState.uploadedUrl && (
            <div>
              <img
                src={thumbnailUploadState.uploadedUrl}
                crossOrigin="anonymous"
                alt={thumbnailUploadState.uploadedUrl}
              />
              <input
                type="text"
                className="hidden"
                defaultValue={thumbnailUploadState.uploadedId!}
                name="thumbnail"
              />
            </div>
          )}
          <label
            htmlFor="thumnail_file"
            className={`border p-4 text-center ${thumbnailUploadState.uploadedUrl && "hidden"}`}
          >
            <input
              type="file"
              id="thumnail_file"
              className="hidden"
              onChange={onThumbnailChange}
            />
            <span>thumnail_file</span>
          </label>

          <Button text="Send Episode" pending={episodePending} />
          {episodeState?.errors ? (
            <span className="text-sm text-red-500">
              {episodeState.errors.formErrors.join(" ")}
            </span>
          ) : null}
        </Form>
      )}

      <div
        className="cursor-pointer transition hover:text-neutral-400"
        onClick={() => {
          resetThumbnailUrl();
          resetVideoUrl();
          resetPostUrl();
          setIsMovieMode((prev) => !prev);
        }}
      >
        change upload mode
      </div>
    </>
  );
}
/* title
description
poster
thumbnail
running_time
video_id */

/* title
description
thumbnail
running_time
number
video_id
season_id
series_id */

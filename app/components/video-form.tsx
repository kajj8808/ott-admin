"use client";
import { ChangeEvent, useActionState, useState } from "react";
import { Season } from "../admin/add_nyaa/action";
import Input from "./input";
import Button from "./button";
import { insertEpisode, insertMovie } from "../admin/insert_video/action";
import useUpload from "../hooks/useUpload";

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
    <div className="mt-2 flex w-full max-w-md flex-col gap-2 overflow-scroll">
      {isMovieMode ? (
        <form action={movieAction} className="flex flex-col gap-2">
          <span className="text-sm text-neutral-400">Movie</span>
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
            htmlFor="video_file"
            className={`border p-4 text-center ${videoUploadState.uploadedUrl && "hidden"}`}
          >
            <input
              type="file"
              id="video_file"
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
          <Button text="Send Movie" pending={moviePending} />
          {movieState?.errors ? (
            <span className="text-sm text-red-500">
              {movieState.errors.formErrors.join(" ")}
            </span>
          ) : null}
        </form>
      ) : (
        <form className="flex flex-col gap-2" action={episodeAction}>
          <span className="text-sm text-neutral-400">Episode</span>
          <select className="rounded-sm p-3 text-center text-lg font-semibold text-neutral-900">
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
            htmlFor="video_file"
            className={`border p-4 text-center ${videoUploadState.uploadedUrl && "hidden"}`}
          >
            <input
              type="file"
              id="video_file"
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
        </form>
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
    </div>
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

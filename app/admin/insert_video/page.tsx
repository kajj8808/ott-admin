import { Season } from "../add_nyaa/action";
import VideoForm from "@/app/components/video-form";

async function getSeasons() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/season/list`,
    {
      method: "GET",
    },
  );
  if (response.ok) {
    const json = (await response.json()).seasons as Season[];
    return json;
  }
}

export default async function Page() {
  const seasons = await getSeasons();

  return (
    <div className="flex h-dvh w-full flex-col items-center justify-center bg-neutral-900">
      <h3 className="text-3xl font-bold uppercase">Insert video</h3>
      {seasons ? (
        <VideoForm seasons={seasons} />
      ) : (
        <span>Episode data를 불러오지 못했습니다.</span>
      )}

      {/* {state?.errors ? (
        <span className="text-sm text-red-500">
          state.errors.formErrors.join(" ")
        </span>
      ) : null} */}
    </div>
  );
}

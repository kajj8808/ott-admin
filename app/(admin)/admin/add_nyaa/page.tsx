import { getSasons } from "./action";
import NyaaForm from "./form";

export default async function AddNyaa() {
  const seasons = await getSasons();

  return (
    <div className="flex h-dvh w-full flex-col items-center justify-center bg-neutral-900">
      <h3 className="text-3xl font-bold uppercase">Add nyaa</h3>
      {seasons ? (
        <NyaaForm seasons={seasons} />
      ) : (
        <span className="text-sm text-red-500">
          Season 정보를 불러 올 수 없습니다.
        </span>
      )}
    </div>
  );
}

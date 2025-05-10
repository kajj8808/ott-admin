import { getSeries } from "./actions";
import MagnetForm from "./form";

export const dynamic = "force-dynamic";

export default async function AddMagnet() {
  const series = await getSeries();

  return (
    <div className="flex h-dvh w-full flex-col items-center justify-center bg-neutral-900">
      <h3 className="text-3xl font-bold uppercase">Add Magnet</h3>
      {series ? (
        <MagnetForm series={series} />
      ) : (
        <span className="text-sm text-red-500">
          Season 정보를 불러 올 수 없습니다.
        </span>
      )}
    </div>
  );
}

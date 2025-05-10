import Title from "@/components/title";
import Link from "next/link";

export default function Page() {
  return (
    <div>
      <Title title="Add Magnet" />
      <div className="flex justify-between gap-1 px-5 pt-3 text-lg font-semibold">
        <Link
          href={"add_magnet/episode"}
          className="transition-all hover:scale-125"
        >
          Episode
        </Link>
        <Link
          href={"add_magnet/movie"}
          className="transition-all hover:scale-125"
        >
          Movie
        </Link>
      </div>
    </div>
  );
}

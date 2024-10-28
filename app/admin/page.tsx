import GradientText from "@/components/gradient-text";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex h-dvh w-full flex-col items-center justify-center gap-2 text-center">
      <GradientText>
        <h3 className="p-5 text-3xl font-medium uppercase">Admin Page</h3>
      </GradientText>
      <div className="flex flex-col gap-1">
        <GradientText>
          <h3 className="text-2xl font-medium">Series</h3>
        </GradientText>
        <ul className="flex flex-col gap-1">
          <li className="transition hover:scale-125">
            <Link href={"/admin/series/insert"}>series insert</Link>
          </li>
        </ul>
      </div>
      <div className="flex flex-col gap-1">
        <GradientText>
          <h3 className="text-2xl font-medium">Season</h3>
        </GradientText>
        <ul className="flex flex-col gap-1">
          <li className="transition hover:scale-125">
            <Link href={"/admin/seires/insert"}>add nyaa query</Link>
          </li>
          <li className="transition hover:scale-125">
            <Link href={"/admin/seires/insert"}>create season</Link>
          </li>
        </ul>
      </div>

      <div className="flex flex-col gap-1">
        <GradientText>
          <h3 className="text-2xl font-medium">Episode</h3>
        </GradientText>
        <ul className="flex flex-col gap-1">
          <li className="transition hover:scale-125">
            <Link href={"/admin/seires/insert"}>add subtitle</Link>
          </li>
          <li className="transition hover:scale-125">
            <Link href={"/admin/seires/insert"}>create episode</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

import { getSession } from "@/lib/session";
import Link from "next/link";

export default async function Admin() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        <h1 className="border-b text-xl font-medium">Admin Pages</h1>
        <nav className="flex flex-col *:text-lg *:font-medium">
          <div>
            <Link href={"/admin/series/insert"}>series insert</Link>
          </div>
          <div>
            <Link href={"/admin/season/add_nyaa"}>add nyaa</Link>
          </div>
          <div>
            <Link href={"/admin/episode/subtitle/add"}>add subtitle</Link>
          </div>
        </nav>
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="border-b text-xl font-medium">APIs</h1>
        <ul className="*:text-lg *:font-medium">
          <Link href={"/admin/api/seasons/auto_download"}>auto_list</Link>
        </ul>
      </div>
    </div>
  );
}

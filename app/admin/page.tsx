import Link from "next/link";

export default function Admin() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        <h1 className="border-b font-medium text-xl">Admin Pages</h1>
        <nav className="*:text-lg *:font-medium flex flex-col ">
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
        <h1 className="border-b font-medium text-xl">APIs</h1>
        <ul className="*:text-lg *:font-medium">
          <Link href={"/admin/api/seasons/auto_download"}>auto_list</Link>
        </ul>
      </div>
    </div>
  );
}

import Link from "next/link";

export default function Admin() {
  return (
    <div>
      <nav className="">
        <div>
          <Link href={"/admin/series/insert"}>series insert</Link>
        </div>
        <div>
          <Link href={"/admin/season/add_nyaa"}>add nyaa</Link>
        </div>
      </nav>
    </div>
  );
}

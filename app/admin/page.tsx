import Title from "../components/title";

export default function Page() {
  return (
    <>
      <Title title="ADMIN PAGE" />
      <ul className="mt-4 flex flex-col gap-1">
        <li>
          <a
            href="admin/insert_series"
            className="text-sm font-semibold uppercase text-neutral-400 transition hover:text-neutral-100"
          >
            insert series
          </a>
        </li>
        <li>
          <a
            href="admin/insert_video"
            className="text-sm font-semibold uppercase text-neutral-400 transition hover:text-neutral-100"
          >
            insert video
          </a>
        </li>
        <li>
          <a
            href="admin/add_nyaa"
            className="text-sm font-semibold uppercase text-neutral-400 transition hover:text-neutral-100"
          >
            add nyaa
          </a>
        </li>
        <li>
          <a
            href="admin/add_subtitle"
            className="text-sm font-semibold uppercase text-neutral-400 transition hover:text-neutral-100"
          >
            add subtitle
          </a>
        </li>
      </ul>
    </>
  );
}

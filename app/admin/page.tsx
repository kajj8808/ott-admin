export default function Page() {
  return (
    <>
      <h3 className="text-3xl font-bold">ADMIN</h3>
      <ul>
        <li>
          <a
            href="admin/insert_series"
            className="text-sm uppercase text-neutral-400 transition hover:text-neutral-100"
          >
            insert series
          </a>
        </li>
        <li>
          <a
            href="admin/insert_video"
            className="text-sm uppercase text-neutral-400 transition hover:text-neutral-100"
          >
            insert video
          </a>
        </li>
        <li>
          <a
            href="admin/add_nyaa"
            className="text-sm uppercase text-neutral-400 transition hover:text-neutral-100"
          >
            add nyaa
          </a>
        </li>
        <li>
          <a
            href="admin/add_subtitle"
            className="text-sm uppercase text-neutral-400 transition hover:text-neutral-100"
          >
            add subtitle
          </a>
        </li>
      </ul>
    </>
  );
}

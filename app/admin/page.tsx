export default function Page() {
  return (
    <>
      <h3 className="text-3xl font-bold">ADMIN</h3>
      <ul>
        <li>
          <a
            href="admin/add_series"
            className="text-sm uppercase text-neutral-400 transition hover:text-neutral-100"
          >
            add series
          </a>
        </li>
      </ul>
    </>
  );
}

import Title from "@/components/title";

export default function Page() {
  const links = [
    { title: "insert series", href: "admin/insert_series" },
    { title: "insert video", href: "admin/insert_video" },
    { title: "add nyaa", href: "admin/add_nyaa" },
    { title: "add magnet", href: "admin/add_magnet" },
    { title: "add subtitle", href: "admin/add_subtitle" },
  ];

  return (
    <>
      <Title title="ADMIN PAGE" />

      <ul className="mt-4 flex flex-col gap-1">
        {links.map((link, index) => (
          <li key={index}>
            <a
              href={link.href}
              className="text-sm font-semibold uppercase text-neutral-400 transition hover:text-neutral-100"
            >
              {link.title}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}

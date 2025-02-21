export default function Page() {
  return (
    <div>
      <h3> Test Page </h3>
      <video controls className="aspect-video" crossOrigin="anonymous">
        <source
          src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/video/1740110568554`}
        />
      </video>
    </div>
  );
}

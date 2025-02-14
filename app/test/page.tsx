export default function Page() {
  return (
    <div>
      <h3> Test Page </h3>
      <video controls className="aspect-video" crossOrigin="anonymous">
        <source src={`http://localhost:3003/video/1739532393087`} />
      </video>
    </div>
  );
}

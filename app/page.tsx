export default function Home() {
  return (
    <div className="flex justify-center items-center h-[100dvh]">
      <video controls className="aspect-video w-96" crossOrigin="anonymous">
        <source src="http://localhost:4000/video/1738166672747" />
      </video>
    </div>
  );
}

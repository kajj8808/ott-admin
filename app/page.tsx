export default function Home() {
  return (
    <div>
      <span className="text-9xl">Hello?</span>
      <div className="relative flex h-12 w-full items-center justify-between">
        <div className="z-30 flex h-full w-[2%] items-center justify-center bg-red-300 bg-opacity-50">
          p
        </div>
        <div className="relative left-[-302.88px] flex h-full w-[96%]">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
            <div
              key={item}
              className="flex min-w-[25%] items-center justify-center border bg-white text-black"
            >
              {item}
            </div>
          ))}
        </div>
        <div className="z-30 flex h-full w-[2%] items-center justify-center bg-red-300 bg-opacity-50">
          n
        </div>
      </div>
    </div>
  );
}

import { Link } from "react-router";

export default function HomePage() {
  return (
    <>
      <div className="z-0 bg-black text-white h-screen w-screen flex justify-center items-center flex-col gap-5">
        <div className="z-10 absolute overflow-hidden flex justify-center items-center">
          <img src="/chess-bg.jpg" className="scale-150 opacity-40" />
        </div>

        <h1 className="z-20 text-4xl sm:text-5xl font-bold text-wrap text-center">
          Play Chess Online <br /> on the #3 Site!
        </h1>
        <button className="z-20 bg-blue-700 hover:bg-blue-600 py-3 px-10 rounded-lg border-b-4 border-b-blue-900 ">
          <Link to="/game">Play Online</Link>
        </button>
      </div>
    </>
  );
}

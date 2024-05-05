import Link from "next/link";

export default function Header({ mode }) {
  return (
  <div className="flex justify-center items-center">
    <div className="flex justify-center items-center my-5 p-5 w-1/2 bg-orange-300 rounded-lg">
      <Link
        href="../"
        className="font-bold text-5xl text-slate-700 leading-none"
      >
        Ultimate Tic-Tac-Toe
      </Link>
      <div className="font-medium text-2xl p-2 mx-5 bg-slate-50 rounded-lg">
        <span>{ mode }</span>
      </div>
    </div>
  </div>
  );
}

import { Link } from "react-router";

export default function Navbar() {
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <Link
          to="/"
          className="btn btn-ghost btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl"
        >
          Lost & Found
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link
              to="/leaderboard"
              className="btn btn-soft btn-secondary btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl"
            >
              Leaderboard
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

import { Link, useLocation } from "react-router-dom";

export default function HomeLink() {
  const location = useLocation();

  return (
    <Link
      className={`${
        location.pathname === "/"
          ? "dark:bg-zinc-700 bg-zinc-400"
          : "dark:hover:bg-zinc-600 hover:bg-zinc-300"
      } block p-4 duration-300`}
      to="/"
    >
      Főoldal
    </Link>
  );
}

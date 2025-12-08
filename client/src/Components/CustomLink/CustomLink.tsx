import { Link } from "react-router-dom";

type Props = {
  children: React.ReactNode;
  to: string;
  activeLink?: boolean;
};

export default function CustomLink({ children, to, activeLink }: Props) {
  return (
    <Link
      className={`${
        activeLink
          ? "dark:bg-zinc-200 dark:text-zinc-800 bg-zinc-800 text-zinc-100"
          : ""
      } block p-4 dark:hover:bg-zinc-200 dark:hover:text-zinc-800 hover:bg-zinc-800 hover:text-zinc-100 duration-300`}
      to={to}
    >
      {children}
    </Link>
  );
}

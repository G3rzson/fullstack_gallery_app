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
          ? "dark:bg-zinc-700 bg-zinc-400"
          : "dark:hover:bg-zinc-600 hover:bg-zinc-300"
      } block p-4 duration-300`}
      to={to}
    >
      {children}
    </Link>
  );
}

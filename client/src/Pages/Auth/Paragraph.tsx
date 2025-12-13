import { Link } from "react-router-dom";

type Props = {
  children: React.ReactNode;
  path: string;
  text: string;
};

export default function Paragraph({ children, path, text }: Props) {
  return (
    <p className="flex items-center gap-4">
      {children}
      <Link
        className="dark:text-amber-200 text-amber-500 hover:dark:text-amber-300 hover:text-amber-600 duration-300"
        to={path}
      >
        {text}
      </Link>
    </p>
  );
}

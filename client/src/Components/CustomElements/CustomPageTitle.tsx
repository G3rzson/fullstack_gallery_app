export default function CustomPageTitle({
  children,
}: {
  children: React.ReactNode;
}) {
  return <h1 className="text-center text-3xl my-8">{children}</h1>;
}

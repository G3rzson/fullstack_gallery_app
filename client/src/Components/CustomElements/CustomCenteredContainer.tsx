export default function CustomCenteredContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 items-center justify-center m-4">
      {children}
    </div>
  );
}

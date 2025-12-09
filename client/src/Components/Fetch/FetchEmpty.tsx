export default function FetchEmpty({ message }: { message?: string }) {
  return (
    <div className="flex flex-1 items-center justify-center p-4">
      <p>{message}</p>
    </div>
  );
}

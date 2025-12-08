export default function FetchEmpty({ message }: { message?: string }) {
  return (
    <div className="flex flex-1 items-center justify-center">
      <p>{message}</p>
    </div>
  );
}

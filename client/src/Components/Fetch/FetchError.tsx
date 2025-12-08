export default function FetchError({ errorMessage }: { errorMessage: string }) {
  return (
    <div className="flex flex-1 items-center justify-center p-4 dark:text-red-400 text-red-500">
      {errorMessage}
    </div>
  );
}

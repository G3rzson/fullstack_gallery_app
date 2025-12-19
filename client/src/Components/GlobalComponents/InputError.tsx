export default function InputErrorMsg({
  errorMsg,
}: {
  errorMsg?: string | undefined;
}) {
  if (!errorMsg) return null;

  return (
    <p className="dark:text-red-400 text-red-500 text-xs absolute -bottom-4 left-0">
      {errorMsg}
    </p>
  );
}

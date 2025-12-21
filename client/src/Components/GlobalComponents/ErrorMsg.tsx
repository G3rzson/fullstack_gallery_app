import { handleAxiosError } from "../../Utils/handleAxiosError";

export default function ErrorMsg({ error }: { error: unknown }) {
  return (
    <div className="flex flex-1 items-center justify-center p-4 dark:text-red-400 text-red-500">
      {handleAxiosError(error)}
    </div>
  );
}

import { handleAxiosError } from "../../Utils/handleAxiosError";

type Props = {
  error: unknown;
};

// hibákat megjelenítő komponens
export default function ErrorMsg({ error }: Props) {
  return (
    <div className="flex flex-1 items-center justify-center p-4 dark:text-red-400 text-red-500">
      {handleAxiosError(error)}
    </div>
  );
}

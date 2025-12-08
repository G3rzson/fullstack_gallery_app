type Props = {
  children: React.ReactNode;
  isSubmitting: boolean;
};

export default function SubmitBtn({ children, isSubmitting }: Props) {
  return (
    <button
      className="cursor-pointer disabled:cursor-not-allowed flex items-center justify-center gap-4 disabled:bg-zinc-500 disabled:hover:bg-zinc-500 dark:bg-green-800 dark:hover:bg-green-600 dark:text-zinc-100 bg-green-300 hover:bg-green-500 text-zinc-900 p-2 rounded duration-300"
      type="submit"
      disabled={isSubmitting}
    >
      {children}
    </button>
  );
}

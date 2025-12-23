import toast from "react-hot-toast";
import { handleAxiosError } from "../../../Utils/handleAxiosError";
import { useNavigate } from "react-router-dom";
import { useContextProvider } from "../../../Hooks/useContextProvider";
import { useAuthDeleteAccount } from "../../../Hooks/useAuthDeleteAccount";
import DeleteModal from "../../GlobalComponents/DeleteModal";
import { useDeleteModal } from "../../../Hooks/useDeleteModal";

type Props = {
  setShowAuthMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function DeleteAccountBtn({ setShowAuthMenu }: Props) {
  const { setAccessToken, setUserObj } = useContextProvider();
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useAuthDeleteAccount();
  const { openModal, closeModal } = useDeleteModal();

  async function handleDelete() {
    try {
      navigate("/", { replace: true });

      const res = await mutateAsync();
      toast.success(res.message ?? "Fiók sikeresen törölve!");
      closeModal();
      setShowAuthMenu(false);
      setAccessToken(null);
      setUserObj(null);
    } catch (error) {
      toast.error(handleAxiosError(error));
    }
  }

  return (
    <>
      <button
        aria-label="Fiók törlése"
        className="bg-zinc-300 hover:bg-zinc-400 dark:bg-zinc-700 dark:hover:bg-zinc-600 duration-300 disabled:cursor-not-allowed w-full p-4 cursor-pointer"
        onClick={() =>
          openModal({
            content: (
              <DeleteModal
                text="Biztosan törölni szeretnéd a fiókodat? Minden adatod elveszik!"
                isPending={isPending}
                handleDelete={handleDelete}
                onModalClose={closeModal}
              />
            ),
          })
        }
      >
        Fiók törlése
      </button>
    </>
  );
}

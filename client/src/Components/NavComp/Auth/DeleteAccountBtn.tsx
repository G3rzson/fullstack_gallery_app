import { useState } from "react";
import DeleteAccountModal from "./DeleteAccountModal";

type Props = {
  setShowAuthMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function DeleteAccountBtn({ setShowAuthMenu }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        aria-label="Fiók törlése"
        className="bg-zinc-300 hover:bg-zinc-400 dark:bg-zinc-700 dark:hover:bg-zinc-600 duration-300 disabled:cursor-not-allowed w-full p-4 cursor-pointer"
      >
        Fiók törlése
      </button>

      {isModalOpen && (
        <DeleteAccountModal
          setShowAuthMenu={setShowAuthMenu}
          onModalClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}

import { useEffect } from "react";

type Props = {
  pathName: string;
  setShowAuthMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

export function useHideAuthMenu({ pathName, setShowAuthMenu }: Props) {
  useEffect(() => {
    if (pathName.startsWith("/")) {
      setShowAuthMenu(false);
    }
  }, [pathName, setShowAuthMenu]);
}

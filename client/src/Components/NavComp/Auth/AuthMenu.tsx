import { useContextProvider } from "../../../Hooks/UseContextProvider";
import LoggedInUser from "./LoggedInUser";
import NotLoggedInUser from "./NotLoggedInUser";

export default function AuthMenu() {
  const { user } = useContextProvider();

  return <>{user ? <LoggedInUser /> : <NotLoggedInUser />}</>;
}

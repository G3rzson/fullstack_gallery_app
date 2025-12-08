import { GlobalContext } from "./Context";

export type ContextType = {};

export default function GlobalContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <GlobalContext.Provider value={{}}>{children}</GlobalContext.Provider>;
}

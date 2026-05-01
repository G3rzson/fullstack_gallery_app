import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./setup/queryClient.ts";
import GalleryContextProvider from "./context/GalleryContextProvider.tsx";
import UserContextProvider from "./context/UserContextProvider.tsx";
import ModalContextProvider from "./context/ModalContextProvider.tsx";
import SearchbarContextProvider from "./context/SearchbarContextProvider.tsx";
import SidebarContextProvider from "./context/SidebarContextProvider.tsx";

export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <SidebarContextProvider>
          <GalleryContextProvider>
            <ModalContextProvider>
              <SearchbarContextProvider>{children}</SearchbarContextProvider>
            </ModalContextProvider>
          </GalleryContextProvider>
        </SidebarContextProvider>
      </UserContextProvider>
    </QueryClientProvider>
  );
}

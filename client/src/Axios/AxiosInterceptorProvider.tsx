import type { ReactNode } from "react";
import { useAxiosInterceptor } from "./interceptor";

export default function AxiosInterceptorProvider({
  children,
}: {
  children: ReactNode;
}) {
  useAxiosInterceptor();
  return <>{children}</>;
}

import type { ReactNode } from "react";
import { useAxiosInterceptor } from "../Axios/interceptor";

type Props = {
  children: ReactNode;
};

export default function AxiosInterceptorProvider({ children }: Props) {
  useAxiosInterceptor();
  return <>{children}</>;
}

import CustomCenteredContainer from "./CustomCenteredContainer";

export default function FetchResultError({
  errorMessage,
}: {
  errorMessage: string;
}) {
  return <CustomCenteredContainer>{errorMessage}</CustomCenteredContainer>;
}

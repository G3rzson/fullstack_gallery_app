import CustomCenteredContainer from "./CustomCenteredContainer";

export default function FetchResultEmpty({ message }: { message?: string }) {
  return (
    <CustomCenteredContainer>
      <p>{message}</p>
    </CustomCenteredContainer>
  );
}

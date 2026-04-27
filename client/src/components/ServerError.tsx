export default function ServerError({ errorMsg }: { errorMsg?: string }) {
  return (
    <div className="centered-container">
      Hiba történt: {errorMsg || "Ismeretlen hiba"}
    </div>
  );
}

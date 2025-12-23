import GaleryLinkArray from "../Components/GaleryTitles/GaleryLinkArray";

export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-3xl">Galéria app</h1>
        <h2 className="text-xl">Üdv a galéria alkalmazásban!</h2>
        <p>
          Regisztrálj és készíts galériákat számodra tetsző képekből!. Dönts el,
          hogy megosztod-e másokkal vagy privátban tartod őket.
        </p>
      </div>

      <GaleryLinkArray mode="public" />
    </div>
  );
}

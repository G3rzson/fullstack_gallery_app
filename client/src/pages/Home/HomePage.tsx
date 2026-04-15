import PageTitle from "../../shared/components/PageTitle/PageTitle";

export default function HomePage() {
  return (
    <div className="centered-container">
      <PageTitle>Galéria app</PageTitle>

      <p>
        Regisztrálj és készíts galériákat számodra tetsző képekből!. Dönts el,
        hogy megosztod-e másokkal vagy privátban tartod őket.
      </p>

      <p>
        Ez egy mintaalkalmazás. Kérlek ne adj meg valódi adatokat, és ne
        használd éles környezetben! Ez az oldal csak bemutató céllal készült, és
        nem rendelkezik valós funkcionalitással. Köszönöm a megértést!
      </p>
    </div>
  );
}

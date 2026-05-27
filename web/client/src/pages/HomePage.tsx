export default function HomePage() {
  return (
    <div className="centered-container gap-6">
      <h1 className="page-title">Galéria app</h1>

      <p className="text-balance text-center">
        Regisztrálj és készíts galériákat számodra tetsző képekből!. Dönts el,
        hogy megosztod-e másokkal vagy privátban tartod őket.
      </p>

      <p className="text-balance text-center text-xl font-semibold text-red-500 dark:text-rose-400">
        Ez egy mintaalkalmazás. Kérlek ne adj meg valódi adatokat, és ne
        használd éles környezetben! Ez az oldal csak bemutató céllal készült, és
        nem rendelkezik valós funkcionalitással. Köszönöm a megértést!
      </p>
    </div>
  );
}

export default function PrivacyPage() {
  return (
    <div className="flex flex-col gap-6 max-w-3xl mx-auto">
      <h1 className="page-title">Adatvédelmi Tájékoztató</h1>
      <p>Utoljára frissítve: 2026. április</p>

      <section>
        <h2 className="text-2xl sm:text-3xl mb-2">1. Bevezető</h2>
        <p>
          Ez egy demo/portfólió projekt, amely nem valós üzleti tevékenységet
          folytat. Az alkalmazás kizárólag bemutatási célokat szolgál.
        </p>
      </section>

      <section>
        <h2 className="text-2xl sm:text-3xl mb-2">2. Adatgyűjtés</h2>
        <p>Az alábbi adatokat gyűjtjük:</p>
        <ul>
          <li>
            <strong>Regisztráció:</strong> Email cím, név, jelszó (titkosítva)
          </li>
          <li>
            <strong>Sütik:</strong> Munkamenet kezelés és preferenciák tárolása
          </li>
          <li>
            <strong>Feltöltött tartalmak:</strong> Képek és termékadatok
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl sm:text-3xl mb-2">3. Adatkezelés</h2>
        <ul>
          <li>Az adatok helyi adatbázisban kerülnek tárolásra</li>
          <li>Jelszavak bcrypt titkosítással vannak védve</li>
          <li>JWT tokenekkel történik az autentikáció</li>
          <li>Az adatok nem kerülnek továbbításra harmadik félnek</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl sm:text-3xl mb-2">4. Sütik</h2>
        <p>Az alábbi sütiket használjuk:</p>
        <ul>
          <li>
            <strong>Autentikációs token:</strong> Bejelentkezés megőrzése
          </li>
          <li>
            <strong>Téma preferencia:</strong> Világos/sötét téma tárolása
          </li>
          <li>
            <strong>Cookie consent:</strong> Süti elfogadás tárolása
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl sm:text-3xl mb-2">5. Felhasználói jogok</h2>
        <p>
          Jogosult vagy adataid megtekintésére, módosítására és törlésére. Mivel
          ez egy demo projekt, kérjük ne adj meg valós személyes adatokat.
        </p>
      </section>

      <section>
        <h2 className="text-2xl sm:text-3xl mb-2">6. Biztonság</h2>
        <p>
          Minden tőlünk telhetőt megteszünk az adatok védelme érdekében, azonban
          felhívjuk figyelmedet, hogy ez egy demo alkalmazás, ezért ne használj
          valós vagy érzékeny adatokat.
        </p>
      </section>

      <section>
        <p className="text-red-500">
          Ez egy portfólió projekt adatvédelmi tájékoztatója. Valós üzleti
          környezetben részletesebb és jogi szempontból auditált dokumentációra
          lenne szükség.
        </p>
      </section>
    </div>
  );
}

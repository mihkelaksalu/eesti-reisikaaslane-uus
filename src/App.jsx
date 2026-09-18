import React, { useState, useEffect } from 'react';

export default function EestiReisikaaslane() {
  const [results, setResults] = useState(false);
  const [location, setLocation] = useState('Tallinn');
  const [profile, setProfile] = useState('seenior');
  const [darkMode, setDarkMode] = useState(false);
  
  // Reaalne andmebaas simuleeritud kohtadest (erinevate profiilide ja ilmastiku jaoks)
  const spotsData = {
    Tallinn: [
      { id: 1, name: "Eesti Ajaloomuuseum (Suurgildi hoone)", category: "muuseum", indoor: true, distance: "450 m", discount: "Pensionärile -50%", img: "🏛️" },
      { id: 2, name: "Kumu kunstimuuseum", category: "muuseum", indoor: true, distance: "1.8 km", discount: "Tasuta sissepääs esmaspäeviti", img: "🖼️" },
      { id: 3, name: "Tallinna Teletorn", category: "vaade", indoor: false, distance: "6.2 km", discount: "Perepilet -20%", img: "🗼" }
    ],
    Tartu: [
      { id: 4, name: "A. Le Coq Õlu Muuseum", category: "muuseum", indoor: true, distance: "2.1 km", discount: "Eelbroneeringuga soodustus", img: "🍺" },
      { id: 5, name: "Tartu Ülikooli Botaanikaaed", category: "loodus", indoor: false, distance: "1.2 km", discount: "Seeniorile soodsam", img: "🌿" }
    ],
    Pärnu: [
      { id: 6, name: "Pärnu Muuseum", category: "muuseum", indoor: true, distance: "800 m", discount: "Sooduspilet perele", img: "🏺" }
    ]
  };

  const currentSpots = spotsData[location] || spotsData.Tallinn;
  const weather = { temp: 11, rainChance: 65, condition: "Vihmaohus" };

  // Leaflet kaardi initsialiseerimine
  useEffect(() => {
    if (results) {
      if (!window.L) {
        const leafletCSS = document.createElement('link');
        leafletCSS.rel = 'stylesheet';
        leafletCSS.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(leafletCSS);

        const leafletJS = document.createElement('script');
        leafletJS.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
        leafletJS.async = true;
        leafletJS.onload = initMap;
        document.body.appendChild(leafletJS);
      } else {
        initMap();
      }
    }
  }, [results, location]);

  const initMap = () => {
    if (window.L && document.getElementById('map')) {
      const container = document.getElementById('map');
      if (container._leaflet_id) { container._leaflet_id = null; }
      
      const coords = location === 'Tartu' ? [58.3800, 26.7250] : location === 'Pärnu' ? [58.3859, 24.4971] : [59.4370, 24.7536];
      const map = window.L.map('map').setView(coords, 13);
      
      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap'
      }).addTo(map);

      currentSpots.forEach(spot => {
        // Lihtsustatud koordinaatide nihe demo jaoks
        window.L.marker(coords).addTo(map)
          .bindPopup(`<b>${spot.name}</b><br>${spot.discount}`);
      });
    }
  };

  return (
    <div className={`min-h-screen font-sans antialiased transition-colors duration-300 ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* Profesionaalne päis */}
      <header className={`sticky top-0 z-50 backdrop-blur-md border-b transition-colors ${darkMode ? 'bg-slate-900/80 border-slate-800 text-white' : 'bg-white/80 border-slate-200 text-slate-800'}`}>
        <div className="max-w-3xl mx-auto px-4 h-16 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🇪🇪</span>
            <span className="font-bold tracking-tight text-lg bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
              Eesti Reisikaaslane
            </span>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-xl text-xs font-medium border transition ${darkMode ? 'border-slate-700 bg-slate-800 hover:bg-slate-700 text-amber-400' : 'border-slate-200 bg-slate-100 hover:bg-slate-200 text-slate-700'}`}
              title="Vaheta teemat"
            >
              {darkMode ? '☀️ Hele' : '🌙 Tumeda'}
            </button>
            <a 
              href="tel:112" 
              className="bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 font-semibold text-xs px-3 py-2 rounded-xl border border-rose-500/20 transition flex items-center gap-1.5"
            >
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
              Hädaabi 112
            </a>
          </div>
        </div>
      </header>

      {/* Sisu */}
      <main className="max-w-3xl mx-auto px-4 py-8">
        {!results ? (
          <div className={`rounded-3xl p-8 border shadow-xl transition-all ${darkMode ? 'bg-slate-900/90 border-slate-800 shadow-emerald-950/20' : 'bg-white border-slate-100 shadow-slate-200/60'}`}>
            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Kuhu soovid täna suunduda?</h2>
              <p className="text-sm opacity-70 mt-2">Vali asukoht ja reisijad, et saaksime kohandada parima plaani.</p>
            </div>
            
            <form onSubmit={(e) => { e.preventDefault(); setResults(true); }} className="space-y-6">
              
              {/* Asukoha valik */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider opacity-60 mb-2">1. Sihtkoht / Asukoht</label>
                <div className="grid grid-cols-3 gap-3">
                  {['Tallinn', 'Tartu', 'Pärnu'].map((city) => (
                    <button
                      type="button"
                      key={city}
                      onClick={() => setLocation(city)}
                      className={`py-3.5 px-4 text-sm font-semibold rounded-2xl border transition-all ${
                        location === city 
                          ? 'border-emerald-600 bg-emerald-600 text-white shadow-lg shadow-emerald-600/20 scale-[1.02]' 
                          : `${darkMode ? 'border-slate-800 bg-slate-800/50 hover:bg-slate-800 text-slate-300' : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'}`
                      }`}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>

              {/* Reisija profiil */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider opacity-60 mb-2">2. Reisija profiil</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: 'seenior', label: '👴 Seenior / Pensionär', desc: 'Soodustused ja mugav ligipääs' },
                    { id: 'pere', label: '👨‍👩‍👧 Perereis lastega', desc: 'Tegevused ja mängud lastele' }
                  ].map((item) => (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => setProfile(item.id)}
                      className={`p-4 text-left rounded-2xl border transition-all ${
                        profile === item.id 
                          ? 'border-emerald-600 bg-emerald-600/10 ring-2 ring-emerald-600/20' 
                          : `${darkMode ? 'border-slate-800 bg-slate-800/50 hover:bg-slate-800' : 'border-slate-200 bg-slate-50 hover:bg-slate-100'}`
                      }`}
                    >
                      <div className="font-bold text-sm">{item.label}</div>
                      <div className="text-xs opacity-60 mt-1">{item.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold py-4 px-6 rounded-2xl transition shadow-lg shadow-emerald-600/25 text-base active:scale-[0.99]"
              >
                Koosta intelligentne reisiplaan &rarr;
              </button>
            </form>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <button 
                onClick={() => setResults(false)}
                className="text-sm font-semibold text-emerald-600 hover:text-emerald-500 flex items-center gap-1.5 transition group"
              >
                <span className="group-hover:-translate-x-1 transition-transform">&larr;</span> Muuda otsingu parameetreid
              </button>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                Sihtkoht: {location}
              </span>
            </div>

            {/* Plaan B Ilmateade / Hoiatus */}
            <div className={`p-5 rounded-3xl border-l-4 border-amber-500 shadow-sm relative overflow-hidden ${darkMode ? 'bg-amber-950/20 border-slate-800 text-amber-200' : 'bg-amber-50/80 border-slate-200 text-amber-900'}`}>
              <div className="flex items-start gap-4">
                <div className="text-3xl">⛅</div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-base">Ilmahoiatus aktiivne</h3>
                    <span className="text-xs px-2 py-0.5 rounded-md bg-amber-500/20 font-semibold">{weather.temp}°C, {weather.condition}</span>
                  </div>
                  <p className="text-xs opacity-80 mt-1">Sademete tõenäosus on {weather.rainChance}%. Aktiveerisime automaatselt **Plaani B** — soovitame peamiselt siseruumides asuvaid vaatamisväärsusi.</p>
                </div>
              </div>
            </div>

            {/* Kaart */}
            <div className="rounded-3xl overflow-hidden border shadow-lg border-slate-700/20">
              <div id="map" className="w-full h-72 z-0"></div>
            </div>

            {/* Kohad nimekirjas */}
            <div className="space-y-4">
              <h4 className="font-extrabold text-lg tracking-tight">Soovitatud kohad täna:</h4>
              
              {currentSpots.map((spot) => (
                <div key={spot.id} className={`p-5 rounded-3xl border shadow-sm transition-all hover:shadow-md ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200/80'}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl p-2 rounded-2xl bg-emerald-500/10">{spot.img}</span>
                      <div>
                        <h5 className="font-bold text-base">{spot.name}</h5>
                        <p className="text-xs opacity-60 mt-0.5">Kaugus sinust: {spot.distance} | {spot.indoor ? '🏠 Siseruumides' : '🌳 Vabas õhus'}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-slate-500/10 flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-xl">
                      ✨ {spot.discount}
                    </span>
                    <button className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2 rounded-xl transition shadow-sm">
                      Salvesta plaani
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}
      </main>
    </div>
  );
}

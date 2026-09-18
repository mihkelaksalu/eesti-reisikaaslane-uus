import React, { useState, useEffect } from 'react';

export default function EestiReisikaaslanePro() {
  const [activeTab, setActiveTab] = useState('soovitused'); // 'soovitused' või 'kaart'
  const [location, setLocation] = useState('Tallinn, Harjumaa');
  const weather = { temp: 8, rainChance: 60, condition: 'Vihmaohus' };

  // Rikkalikumad kohad koos piltide, hindade ja omadustega (nagu disainis)
  const spots = [
    {
      id: 1,
      name: "Kumu Kunstimuuseum",
      category: "Muuseum",
      distance: "500 m",
      desc: "Eesti kunst läbi aegade. Ajutine näitus: \"Valgus ja värv\".",
      price: "Pilet 8 €",
      indoor: true,
      img: "https://images.unsplash.com/photo-1565138147144-b153b6d91bb3?w=500&auto=format&fit=crop&q=60"
    },
    {
      id: 2,
      name: "Coca-Cola Plaza (Ülemiste)",
      category: "Kino",
      distance: "1.2 km",
      desc: "Viimased filmid mugavas saalis. Soodne pilet enne 17:00.",
      price: "Pilet 7 €",
      indoor: true,
      img: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&auto=format&fit=crop&q=60"
    },
    {
      id: 3,
      name: "Tallinna Korvpallihalli spordiklubi",
      category: "Sport",
      distance: "1.8 km",
      desc: "Korvpallitreeningud ja amatöörliiga. Kõik on teretulnud!",
      price: "Pilet 0 €",
      indoor: true,
      img: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=500&auto=format&fit=crop&q=60"
    },
    {
      id: 4,
      name: "Rocca al Mare terviserada",
      category: "Loodus",
      distance: "2.5 km",
      desc: "Metsa- ja rabarada mere ääres. Värske õhk ja vaikus.",
      price: "Tasuta",
      indoor: false,
      img: "https://images.unsplash.com/photo-1511497584788-876761197069?w=500&auto=format&fit=crop&q=60"
    }
  ];

  // Leaflet kaardi laadimine
  useEffect(() => {
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
  }, [activeTab]);

  const initMap = () => {
    if (window.L && document.getElementById('map')) {
      const container = document.getElementById('map');
      if (container._leaflet_id) { container._leaflet_id = null; }
      
      const map = window.L.map('map').setView([59.4370, 24.7536], 13);
      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap'
      }).addTo(map);

      spots.forEach((spot, idx) => {
        // Paigutame markerid Tallinna ümber demo jaoks
        const latOffset = (idx * 0.008);
        const lonOffset = (idx * 0.01);
        window.L.marker([59.4370 + latOffset, 24.7536 + lonOffset]).addTo(map)
          .bindPopup(`<b>${spot.name}</b><br>${spot.price}`);
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-16 font-sans">
      
      {/* Ülemine navigeerimisribaa */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 h-16 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button className="text-slate-600 text-xl">☰</button>
            <h1 className="font-extrabold text-lg text-slate-800">Täna Eesti</h1>
          </div>
          <div className="flex items-center gap-4 text-sm font-medium text-slate-600">
            <button className="hover:text-emerald-600">🔍 Otsi</button>
            <button className="hover:text-emerald-600 hidden sm:block">📅 Sündmused</button>
            <button className="hover:text-emerald-600 hidden sm:block">🗺️ Reisiplaan</button>
            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-700">👤</div>
          </div>
        </div>
      </header>

      {/* Põhisisu */}
      <main className="max-w-4xl mx-auto px-4 mt-4 space-y-4">
        
        {/* Ilmahoiatus / Plaan B bänner */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🌧️</span>
            <div>
              <div className="font-bold text-slate-800">{weather.temp}°C, {weather.rainChance}% rain</div>
              <p className="text-xs text-slate-500">→ Prefer indoor (museum/cinema). Take umbrella!</p>
            </div>
          </div>
          <button className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-3 py-2 rounded-xl transition flex items-center justify-center gap-1.5 self-start sm:self-auto">
            <span>🔄</span> Plaan B
          </button>
        </div>

        {/* Asukoha ja vaate valik */}
        <div className="flex items-center justify-between bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
            <span className="text-emerald-600">📍</span>
            <span>{location}</span>
            <span className="text-xs text-slate-400">▼</span>
          </div>
          
          <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-semibold">
            <button 
              onClick={() => setActiveTab('soovitused')}
              className={`px-4 py-1.5 rounded-lg transition ${activeTab === 'soovitused' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}
            >
              Soovitused
            </button>
            <button 
              onClick={() => setActiveTab('kaart')}
              className={`px-4 py-1.5 rounded-lg transition ${activeTab === 'kaart' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}
            >
              Kaart
            </button>
          </div>
        </div>

        {/* Kui vaheleht on Soovitused */}
        {activeTab === 'soovitused' && (
          <div className="space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 px-1">Soovitused sinu asukohale</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {spots.map((spot) => (
                <div key={spot.id} className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition">
                  <div className="h-40 w-full relative">
                    <img src={spot.img} alt={spot.name} className="w-full h-full object-cover" />
                    <span className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2.5 py-1 rounded-full text-xs font-bold text-emerald-600 shadow">
                      ✓
                    </span>
                  </div>
                  
                  <div className="p-4 space-y-3">
                    <div>
                      <h3 className="font-bold text-base text-slate-800">{spot.name}</h3>
                      <p className="text-xs text-slate-500 mt-0.5">📍 {spot.distance} • 🏛️ {spot.category}</p>
                      <p className="text-xs text-slate-600 mt-2">{spot.desc}</p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs text-slate-500">
                        <span>♿ Jah</span>
                        <span>👥 Peredele</span>
                        <span className="font-bold text-slate-800">{spot.price}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold py-2 px-3 rounded-xl transition flex items-center justify-center gap-1">
                        🧭 Juhised
                      </button>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2 px-3 rounded-xl transition flex items-center justify-center gap-1 shadow-sm shadow-blue-600/20">
                        🎟️ Piletid
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Kui vaheleht on Kaart */}
        {activeTab === 'kaart' && (
          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
            <div id="map" className="w-full h-[450px] z-0"></div>
          </div>
        )}

      </main>

      {/* Hädaabi fikseeritud riba allosas */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-slate-200 p-3 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-rose-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">112</div>
            <div className="text-xs">
              <span className="font-bold text-slate-800 block">Hädaolukorras helista 112</span>
              <span className="text-slate-500">Kiirabi • Politsei • Pääste</span>
            </div>
          </div>
          <a href="tel:112" className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md transition flex items-center gap-1.5">
            📞 Helista 112
          </a>
        </div>
      </div>

    </div>
  );
}

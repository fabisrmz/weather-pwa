"use client";
import { useState } from "react";
import { getWeatherByCity, getWeatherByCoords } from "./lib/weather";
import InstallPrompt from "./components/InstallPrompt";

export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!city) return;
    try {
      setError("");
      const data = await getWeatherByCity(city);
      setWeather(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        try {
          setError("");
          const data = await getWeatherByCoords(
            position.coords.latitude,
            position.coords.longitude
          );
          setWeather(data);
        } catch (err) {
          setError(err.message);
        }
      });
    }
  };

  return (
    <main style={{ width: '100%', maxWidth: '480px', padding: '1rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {/* Formularios de búsqueda */}
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.5rem' }}>
          <input
            type="text"
            placeholder="Ejemplo: Oaxaca, Madrid..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="weather-input"
          />
          <button type="submit" className="weather-btn">
            Buscar
          </button>
        </form>

        <button onClick={handleLocation} className="weather-btn-secondary">
          📍 Usar mi ubicación actual
        </button>

        {error && <p style={{ color: '#f87171', textAlign: 'center' }}>{error}</p>}

        {/* Tarjeta del clima */}
        {weather && (
          <div className="weather-card">
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', textAlign: 'center' }}>
              {weather.name}, {weather.sys?.country}
            </h2>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', margin: '1rem 0' }}>
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
                style={{ width: '80px', height: '80px' }}
              />
              <span style={{ fontSize: '3rem', fontWeight: '800' }}>
                {Math.round(weather.main.temp)}°C
              </span>
            </div>

            <p style={{ textAlign: 'center', textTransform: 'capitalize', fontSize: '1.125rem', color: '#d1d5db', marginBottom: '1.5rem' }}>
              {weather.weather[0].description}
            </p>

            <div style={{ borderTop: '1px solid #2a3550', paddingTop: '1rem', display: 'flex', justifyContent: 'space-around', fontSize: '0.875rem', color: '#d1d5db' }}>
              <div>
                Humedad: <strong style={{ color: '#fff' }}>{weather.main.humidity}%</strong>
              </div>
              <div>
                Viento: <strong style={{ color: '#fff' }}>{weather.wind.speed} m/s</strong>
              </div>
            </div>
          </div>
        )}

        <InstallPrompt />
      </div>
    </main>
  );
}
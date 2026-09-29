import { useEffect, useState } from "react";
import "./App.css";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const initialWeather = {
  name: "Kolkata",
  main: { temp: 29, feels_like: 33, humidity: 72 },
  wind: { speed: 3.2 },
  weather: [{ main: "Clouds", description: "scattered clouds", icon: "03d" }],
  sys: { sunrise: 0, sunset: 0 },
  timezone: 19800,
};

function clockTime(timestamp, timezone) {
  return new Intl.DateTimeFormat("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  }).format(new Date((timestamp + timezone) * 1000));
}

export default function App() {
  const [cityInput, setCityInput] = useState("Kolkata");
  const [city, setCity] = useState("Kolkata");
  const [weather, setWeather] = useState(initialWeather);
  const [loading, setLoading] = useState(Boolean(API_KEY));
  const [error, setError] = useState(
    API_KEY
      ? ""
      : "Add your OpenWeatherMap key to .env to load live weather. Showing sample conditions.",
  );

  useEffect(() => {
    if (!API_KEY) return;
    const controller = new AbortController();
    async function loadWeather() {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`,
          { signal: controller.signal },
        );
        if (!response.ok)
          throw new Error(
            response.status === 404
              ? "City not found. Check the spelling and try again."
              : "Weather could not be loaded. Check your connection and API key.",
          );
        setWeather(await response.json());
      } catch (reason) {
        if (reason.name !== "AbortError") setError(reason.message);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    loadWeather();
    return () => controller.abort();
  }, [city]);

  function searchCity(event) {
    event.preventDefault();
    const nextCity = cityInput.trim();
    if (nextCity && nextCity !== city) {
      setLoading(true);
      setError("");
      setCity(nextCity);
    }
  }

  const current = weather.weather[0];
  return (
    <main className="weather-app">
      <header className="weather-header">
        <a className="brand" href="#top">
          FIELDNOTES <span>/ WEATHER</span>
        </a>
        <span>LIVE CONDITIONS · METRIC</span>
        <span className="location-mark">{weather.name.toUpperCase()} ↗</span>
      </header>
      <section className="weather-hero" id="top">
        <div className="weather-title">
          <p className="eyebrow">YOUR SKY, RIGHT NOW</p>
          <h1>
            Weather
            <br />
            <em>report.</em>
          </h1>
          <p>Forecasts for wherever you find yourself.</p>
        </div>
        <form className="city-search" onSubmit={searchCity}>
          <label htmlFor="city">Find a city</label>
          <div>
            <input
              id="city"
              value={cityInput}
              onChange={(event) => setCityInput(event.target.value)}
              placeholder="e.g. London"
            />
            <button type="submit" aria-label="Search city">
              ↗
            </button>
          </div>
          <span>Kolkata · Delhi · Mumbai · London</span>
        </form>
      </section>
      {error && (
        <p className="weather-message" role="status">
          {error}
        </p>
      )}
      <section className="conditions" aria-live="polite">
        <div className="conditions-main">
          <div>
            <p className="eyebrow">
              {weather.name.toUpperCase()} · CURRENT CONDITIONS
            </p>
            <h2>
              {Math.round(weather.main.temp)}
              <sup>°</sup>
            </h2>
            <p className="description">{current.description}</p>
          </div>
          <div className="weather-art">
            {API_KEY && current.icon ? (
              <img
                src={`https://openweathermap.org/img/wn/${current.icon}@2x.png`}
                alt={current.description}
              />
            ) : (
              <span>{current.main === "Clouds" ? "☁" : "☀"}</span>
            )}
          </div>
        </div>
        <div className="condition-stats">
          <div>
            <span>FEELS LIKE</span>
            <strong>{Math.round(weather.main.feels_like)}°</strong>
          </div>
          <div>
            <span>HUMIDITY</span>
            <strong>{weather.main.humidity}%</strong>
          </div>
          <div>
            <span>WIND SPEED</span>
            <strong>
              {weather.wind.speed} <small>m/s</small>
            </strong>
          </div>
          <div>
            <span>DAYLIGHT</span>
            <strong>
              {API_KEY
                ? clockTime(weather.sys.sunrise, weather.timezone)
                : "06:03"}{" "}
              <small>/</small>{" "}
              {API_KEY
                ? clockTime(weather.sys.sunset, weather.timezone)
                : "17:47"}
            </strong>
          </div>
        </div>
      </section>
      <footer className="weather-footer">
        <span>{loading ? "UPDATING FORECAST…" : "OBSERVATION"}</span>
        <span>
          {loading ? <span className="loader" /> : "OPENWEATHERMAP · OPEN DATA"}
        </span>
        <span>°C / METRIC</span>
      </footer>
    </main>
  );
}

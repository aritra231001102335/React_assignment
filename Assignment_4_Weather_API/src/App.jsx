import { useEffect, useState } from "react";
import "./App.css";

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
  const [loading, setLoading] = useState(true);
  const [hasLiveWeather, setHasLiveWeather] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    async function loadWeather() {
      try {
        const response = await fetch(
          `/api/weather?city=${encodeURIComponent(city)}`,
          { signal: controller.signal },
        );
        const result = await response.json().catch(() => null);
        if (!response.ok || !result)
          throw new Error(
            result?.message || "Weather could not be loaded. Try again later.",
          );
        setWeather(result);
        setHasLiveWeather(true);
      } catch (reason) {
        if (reason.name !== "AbortError") {
          setError(reason.message || "Weather could not be loaded. Try again later.");
        }
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
      setHasLiveWeather(false);
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
            {hasLiveWeather && current.icon ? (
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
              {hasLiveWeather
                ? clockTime(weather.sys.sunrise, weather.timezone)
                : "06:03"}{" "}
              <small>/</small>{" "}
              {hasLiveWeather
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

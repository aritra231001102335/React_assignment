export default async function handler(request, response) {
  if (request.method !== "GET") {
    response.setHeader("Allow", "GET");
    return response.status(405).json({ message: "Method not allowed." });
  }

  const city = typeof request.query.city === "string" ? request.query.city.trim() : "";
  if (!city || city.length > 100) {
    return response.status(400).json({ message: "Enter a valid city name." });
  }

  const apiKey = process.env.OPENWEATHER_API_KEY;
  if (!apiKey) {
    return response
      .status(503)
      .json({ message: "The weather service is not configured." });
  }

  const url = new URL("https://api.openweathermap.org/data/2.5/weather");
  url.searchParams.set("q", city);
  url.searchParams.set("appid", apiKey);
  url.searchParams.set("units", "metric");

  try {
    const upstream = await fetch(url);
    const weather = await upstream.json();

    if (!upstream.ok) {
      return response
        .status(upstream.status === 404 ? 404 : 502)
        .json({
          message:
            upstream.status === 404
              ? "City not found. Check the spelling and try again."
              : "Weather data could not be loaded. Try again later.",
        });
    }

    return response.status(200).json(weather);
  } catch {
    return response
      .status(502)
      .json({ message: "Weather data could not be loaded. Try again later." });
  }
}
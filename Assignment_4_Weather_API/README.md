# Assignment 4: Weather API

The Vite app requests weather from `/api/weather`. On Vercel, that route runs as a serverless function and reads the OpenWeather key on the server, so the key is not included in the browser bundle.

## Vercel setup

Set the project's Root Directory to `Assignment_4_Weather_API`. In **Settings → Environment Variables**, add `OPENWEATHER_API_KEY` with the OpenWeather API key for Production (and Preview if needed), then redeploy. Do not use the `VITE_` prefix; Vite exposes variables with that prefix to browser code.

## Local development

Create an ignored `.env.local` file in this directory with:

```env
OPENWEATHER_API_KEY=your_openweathermap_api_key_here
```

Run the app through Vercel's local development server so the serverless function is available:

```sh
npx vercel dev
```

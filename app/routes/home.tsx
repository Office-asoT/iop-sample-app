import WeatherForecast from "~/components/home/weather-forecast";

import type { Route } from "./+types/home";

const getSelectedMunicipality = async (userId: string) => {
  const response = await fetch(`http://localhost:8000/api/weather_forecast_settings/${userId}`);
  if (response.status !== 200) throw response;
  const data = await response.json();
  return data.municipality;
}

const getMunicipalities = async () => {
  const response = await fetch("http://localhost:8000/api/municipalities");
  if (response.status !== 200) throw response;
  const data = await response.json();
  return data;
}

const fetchWeatherForecast = async (latitude: number, longitude: number) => {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,precipitation,weathercode,windspeed_10m,winddirection_10m&timezone=Asia/Tokyo`
    );

    if (response.status !== 200) throw response;

    const data = await response.json();
    if (!data.hourly) {
      console.error("天気データが取得できません:", data);
      throw new Response("天気データが取得できません", { status: 404 });
    }

    const now = new Date();
    now.setHours(now.getHours() - 1);

    return data.hourly.time.map((time, index) => ({
      time,
      temperature: data.hourly.temperature_2m[index],
      precipitation: data.hourly.precipitation[index],
      weatherCode: data.hourly.weathercode[index],
      windSpeed: data.hourly.windspeed_10m[index],
      windDirection: data.hourly.winddirection_10m[index],
    })).filter(hour => new Date(hour.time) >= now);

  } catch (error) {
    console.error('天気API取得エラー:', error);
    throw error;
  }
};

export async function loader() {
  const municipalities = await getMunicipalities();
  const selectedMunicipality = await getSelectedMunicipality("hoge");
  const { latitude, longitude } = selectedMunicipality;
  const weatherForecastPromise = fetchWeatherForecast(latitude, longitude);
  return { municipalities, selectedMunicipality, weatherForecastPromise };
}

export default function Home({
  loaderData,
}: Route.ComponentProps) {
  const {
    municipalities,
    selectedMunicipality,
    weatherForecastPromise
  } = loaderData;
  return (
    <div>
      <h2>ホーム</h2>
      <WeatherForecast
        municipalities={municipalities}
        selectedMunicipality={selectedMunicipality}
        weatherForecastPromise={weatherForecastPromise}
      />
    </div>
  );
}

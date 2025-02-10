import { redirect } from "react-router";

import type { Route } from "./+types/edit-weather-forecast";

export async function action({
  request
}: Route.ActionArgs) {
  const formData = await request.formData();
  const userId = formData.get("userId");
  const municipalityCode = formData.get("municipalityCode");
  const host = import.meta.env.VITE_IOP_SAMPLE_WEB_API_HOST;
  await fetch(`http://${host}:8000/api/weather_forecast_settings/${userId}`, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "municipality_code": municipalityCode,
    })
  });
  return redirect("/");
}

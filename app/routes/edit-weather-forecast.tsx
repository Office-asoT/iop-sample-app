import { redirect } from "react-router";

import type { Route } from "./+types/edit-weather-forecast";

export async function action({
  request
}: Route.ActionArgs) {
  const formData = await request.formData();
  const userId = formData.get("userId");
  const municipalityCode = formData.get("municipalityCode");
  await fetch(`http://localhost:8000/api/weather_forecast_settings/${userId}`, {
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

import { redirect } from "react-router";
import type { Route } from "./+types/upsert-delivery-email-address";

export async function action({
  request
}: Route.ActionArgs) {
  const formData = await request.formData();
  const rawData = Array.from(formData.entries());
  const formattedData = [];

  for (let i = 0; i < rawData.length; i += 2) {
    formattedData.push({
      "delivery_name": rawData[i][1],
      "email_address": rawData[i + 1][1],
    });
  }

  const userId = "hoge";
  const host = import.meta.env.VITE_IOP_SAMPLE_WEB_API_HOST;
  const response = await fetch(`http://${host}:8000/api/delivery_email_address/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formattedData),
  });

  return redirect("/delivery-email-address");
}

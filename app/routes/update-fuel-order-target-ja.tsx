import { redirect } from "react-router";

import type { Route } from "./+types/update-fuel-order-target-ja";

export async function action({
  request
}: Route.ActionArgs) {
  const formData = await request.formData();
  const userId = "hoge";
  const rawData = Array.from(formData.entries());
  const formattedData = [];

  for (let i = 0; i < rawData.length; i += 2) {
    formattedData.push({
      "farm_field_id": rawData[i][1],
      "ja_branch_office_number": rawData[i + 1][1],
    });
  }

  const host = import.meta.env.VITE_IOP_SAMPLE_WEB_API_HOST;
  const response = await fetch(`http://${host}:8000/api/fuel_order_target_jas/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formattedData),
  });

  return redirect("/fuel-order-target-ja");
}

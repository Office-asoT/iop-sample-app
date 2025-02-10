import type { Route } from "./+types/create-fuel-order.tsx";

export async function action({
  request
}: Route.ActionArgs) {
  const formData = await request.formData();

  const userId = formData.get("userId");
  const farmFieldId = formData.get("farmFieldId");
  const farmFieldName = formData.get("farmFieldName");
  const jaBranchOfficeName = formData.get("jaBranchOfficeName");
  const jaBranchOfficeNumber = formData.get("jaBranchOfficeNumber");
  const jaBranchOfficeEmailAddress = formData.get("jaBranchOfficeEmailAddress");
  const fuelType = formData.get("fuelType");
  const quantity = formData.get("quantity");

  const host = import.meta.env.VITE_IOP_SAMPLE_WEB_API_HOST;
  const response = await fetch(`http://${host}:8000/api/fuel_order/${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "farm_field_id": farmFieldId,
      "ja_branch_office_number": jaBranchOfficeNumber,
      "fuel_type":fuelType,
      "quantity":Number(quantity),
      "status":"依頼中"
    }),
  });

  let message = "発注メールを送信できませんでした。"
  if (201 == response.status) {
    const data = await response.json();
    const jstDate = new Date(data["order_date"]);
    const options = {
      timeZone: "Asia/Tokyo",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    };

    const orderDate = new Intl.DateTimeFormat("ja-JP", options).format(jstDate);
    const host = import.meta.env.VITE_IOP_SAMPLE_WEB_API_HOST;
    const mailResponse = await fetch(`http://${host}:8000/api/send_fuel_order_mail/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        "email_address": jaBranchOfficeEmailAddress,
        "ja_branch_office_name": jaBranchOfficeName,
        "order_date": orderDate,
        "farm_field_name": farmFieldName,
        "fuel_type": fuelType,
        "quantity": quantity
      }),
    });

    if (500 != mailResponse.status){
      message = "発注メールを送信しました。"
    }

  }
  return { message, redirectUrl: "/fuel-order" }
}

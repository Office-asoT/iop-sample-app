import { redirect } from "react-router";
import type { Route } from "./+types/cancel-fuel-order.tsx";

export async function action({
  request
}: Route.ActionArgs) {
  const formData = await request.formData();
  const userId = formData.get("userId");
  const orderDate = formData.get("orderDate");
  const farmFieldName = formData.get("farmFieldName");
  const jaBranchOfficeName = formData.get("jaBranchOfficeName");
  const convertOrderDate = formData.get("convertOrderDate");
  const jaBranchOfficeEmailAddress = formData.get("jaBranchOfficeEmailAddress");
  const fuelType = formData.get("fuelType");
  const quantity = formData.get("quantity");

  const response = await fetch(`http://localhost:8000/api/fuel_order/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "order_date": orderDate,
      "status":"キャンセル依頼中"
    }),
  });

  let message = "燃料発注依頼のキャンセルに失敗しました。"
  if (200 == response.status) {
    const data = await response.json();
    
    const mailResponse = await fetch(`http://localhost:8000/api/send_cancel_fuel_order_mail/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      
      body: JSON.stringify({
        "email_address": jaBranchOfficeEmailAddress,
        "ja_branch_office_name": jaBranchOfficeName,
        "order_date": convertOrderDate,
        "farm_field_name": farmFieldName,
        "fuel_type": fuelType,
        "quantity": quantity
      }),
    });
  }

  if (400 != response.status){
    message = "燃料発注のキャンセルを依頼しました。"
  }

  return { message, redirectUrl: "/fuel-order" }
}

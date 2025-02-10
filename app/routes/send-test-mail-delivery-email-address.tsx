import { redirect } from "react-router";
import type { Route } from "./+types/send-test-mail-delivery-email-address.tsx";

export async function action({
  request
}: Route.ActionArgs) {
  const formData = await request.formData();

  const userId = "hoge";
  const emailAddress = formData.get("emailAddress");

  const host = import.meta.env.VITE_IOP_SAMPLE_WEB_API_HOST;
  const response = await fetch(`http://${host}:8000/api/send_test_mail/${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ "email_address": emailAddress }),
  });

  let message = "テストメールを送信できませんでした。"
  if (500 != response.status){
    message = "テストメールを送信しました。"
  }

  return redirect("/delivery-email-address/edit");
}

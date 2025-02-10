import type { Route } from "./+types/delete-delivery-email-address";

export async function action({
  request
}: Route.ActionArgs) {
  const formData = await request.formData();

  const userId = "hoge";
  const emailAddress = formData.get("emailAddress");

  const host = import.meta.env.VITE_IOP_SAMPLE_WEB_API_HOST;
  const response = await fetch(`http://${host}:8000/api/delivery_email_address/${userId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ "email_address": emailAddress }),
  });

  return { message: "削除しました。", redirectUrl: "/delivery-email-address" };
}

import type { Route } from "./+types/delete-warning-mail";

export async function action({
  request
}: Route.ActionArgs) {
  const formData = await request.formData();
  const userId = formData.get("userId");
  const id = formData.get("id");

  const host = import.meta.env.VITE_IOP_SAMPLE_WEB_API_HOST;
  const response = await fetch(`http://${host}:8000/api/warning_mail_settings/${userId}/${id}`, {
    method: "DELETE",
  });

  const { ok, status, statusText } = response;

  if (!ok) {
    const error = await response.json();
    return {
      ok,
      status,
      statusText,
      error,
    };
  }

  return { ok, message: "削除しました。" };
}

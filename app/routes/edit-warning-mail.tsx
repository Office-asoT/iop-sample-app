import type { Route } from "./+types/edit-warning-mail";

export async function action({
  request
}: Route.ActionArgs) {
  const formData = await request.formData();

  const userId = formData.get("userId");
  const id = formData.get("id");
  const enabled = !!(formData.get("enabled"));

  const host = import.meta.env.VITE_IOP_SAMPLE_WEB_API_HOST;
  const response = await fetch(`http://${host}:8000/api/warning_mail_settings/${userId}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "enabled": enabled,
    }),
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

  return { ok };
}

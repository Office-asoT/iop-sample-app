import type { Route } from "./+types/create-warning-mail";

export async function action({
  request
}: Route.ActionArgs) {
  const formData = await request.formData();

  const userId = formData.get("userId");
  const farmFieldId = formData.get("farmFieldId");
  const warningName = formData.get("warningName");
  const monitoringStartTime = formData.get("monitoringStartTime");
  const monitoringEndTime = formData.get("monitoringEndTime");
  const monitoringSensor = formData.get("monitoringSensor");
  const monitoringCondition = formData.get("monitoringCondition");
  const monitoringValue = formData.get("monitoringValue");
  const duration = formData.get("duration");
  const enabled = formData.get("enabled");

  const host = import.meta.env.VITE_IOP_SAMPLE_WEB_API_HOST;
  const response = await fetch(`http://${host}:8000/api/warning_mail_settings/${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "farm_field_id": farmFieldId,
      "warning_name": warningName,
      "monitoring_start_time": monitoringStartTime,
      "monitoring_end_time": monitoringEndTime,
      "monitoring_sensor": monitoringSensor,
      "monitoring_condition": monitoringCondition,
      "monitoring_value": monitoringValue,
      "duration": duration,
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

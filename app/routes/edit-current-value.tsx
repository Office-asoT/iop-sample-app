import { redirect } from "react-router";

import type { Route } from "./+types/edit-current-value";

const buildPostData = (currentSetting, visible, order) => {
  const result = {
    "setting": currentSetting,
  };
  result["setting"]["home"]["current-value"] = {};
  return order.reduce((result, dataName) => {
    result["setting"]["home"]["current-value"][dataName] = visible.includes(dataName);
    return result;
  }, result);
}

const getDisplaySetting = async (userId: string, farmFieldId: string) => {
  const host = import.meta.env.VITE_IOP_SAMPLE_WEB_API_HOST;
  const response = await fetch(`http://${host}:8000/api/display_settings/${userId}/${farmFieldId}`);
  if (response.status !== 200) throw response;
  const data = await response.json();
  return data;
}

export async function action({
  request,
}: Route.ActionArgs) {
  const formData = await request.formData();
  const userId = formData.get("userId");
  const farmFieldId = formData.get("farmFieldId")
  const visible = formData.getAll("visible");
  const order = formData.getAll("order");

  const { setting: currentSetting } = await getDisplaySetting(userId, farmFieldId);
  const postData = buildPostData(currentSetting, visible, order);

  const host = import.meta.env.VITE_IOP_SAMPLE_WEB_API_HOST;
  await fetch(`http://${host}:8000/api/display_settings/${userId}/${farmFieldId}`, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  });

  return redirect("/");
}

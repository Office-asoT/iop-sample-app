import { redirect } from "react-router";

import type { Route } from "./+types/edit-current-value";

const buildPostData = (currentSetting, visible) => {
  const currentEnvironmentGraphSetting = currentSetting["home"]["environment-graph"];
  const result = {
    "setting": currentSetting,
  };
  return Object.keys(currentEnvironmentGraphSetting).reduce((result, dataName) => {
    result["setting"]["home"]["environment-graph"][dataName] = visible.includes(dataName);
    return result;
  }, result);
}

const getDisplaySetting = async (userId: string, farmFieldId: string) => {
  const response = await fetch(`http://localhost:8000/api/display_settings/${userId}/${farmFieldId}`);
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

  const { setting: currentSetting } = await getDisplaySetting(userId, farmFieldId);
  const postData = buildPostData(currentSetting, visible);

  await fetch(`http://localhost:8000/api/display_settings/${userId}/${farmFieldId}`, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  });

  return redirect("/");
}

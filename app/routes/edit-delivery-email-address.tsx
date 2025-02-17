import { useEffect } from "react";

import PageHeader from "~/components/page-header";
import EditDeliveryEmailAddressFromList from "~/components/delivery-email/edit-delivery-email-address-form-list";

import type { Route } from "./+types/edit-delivery-email-address";

const getSelecteDeleveryEmailAddress = async (userId: string) => {
  const host = import.meta.env.VITE_IOP_SAMPLE_WEB_API_HOST;
  const response = await fetch(`http://${host}:8000/api/delivery_email_address/${userId}`);
  if (response.status !== 200) throw response;
  const data = await response.json();
  return data;
}

export async function loader() {
  const deliveryEmailAddresses = await getSelecteDeleveryEmailAddress("hoge");
  return { deliveryEmailAddresses };
}

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

  return { message: message };
}

export default function EditDeliveryEmailAddress({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const {
    deliveryEmailAddresses
  } = loaderData;

  useEffect(() => {
    if (actionData?.message) {
      window.alert(actionData.message)
    }
  }, [actionData])

  return (
    <div>
      <PageHeader
        title="配信先メールアドレスの登録・編集"
        iconName="mail"
      />
      <EditDeliveryEmailAddressFromList deliveryEmailAddresses={deliveryEmailAddresses}/>
    </div>
  );
}

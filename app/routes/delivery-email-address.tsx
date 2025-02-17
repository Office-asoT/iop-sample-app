import PageHeader from "~/components/page-header";
import DeliveryEmailAddressList from "~/components/delivery-email/delivery-email-address-list";

import type { Route } from "./+types/delivery-email-address";

const getSelecteDeleveryEmailAddress = async (userId: string) => {
  const host = import.meta.env.VITE_IOP_SAMPLE_WEB_API_HOST;
  const response = await fetch(`http://${host}:8000/api/delivery_email_address/${userId}`);
  if (response.status !== 200) throw response;
  const data = await response.json();
  return data.map(({ delivery_name, email_address }) => ({
    deliveryName: delivery_name,
    emailAddress: email_address,
  }));
}

export async function loader() {
  const deliveryEmailAddresses = await getSelecteDeleveryEmailAddress("hoge");
  return { deliveryEmailAddresses };
}

export default function DeliveryEmailAddress({
  loaderData,
}: Route.ComponentProps) {
  const {
    deliveryEmailAddresses
  } = loaderData;
  return (
    <div>
      <PageHeader
        title="配信先メールアドレス"
        iconName="mail"
        linkTo="/delivery-email-address/edit"
        linkText="登録・編集"
      />
      <DeliveryEmailAddressList deliveryEmailAddresses={deliveryEmailAddresses} />
    </div>
  );
}

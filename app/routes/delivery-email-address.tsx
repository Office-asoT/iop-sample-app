import { Link } from "react-router";
import DeliveryEmailAddressList from "~/components/delivery-email/delivery-email-address-list";
import type { Route } from "./+types/delivery-email-address";
import styles from "./delivery-email-address.module.css";

const getSelecteDeleveryEmailAddress = async (userId: string) => {
  const response = await fetch(`http://localhost:8000/api/delivery_email_address/${userId}`);
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
      <div className={styles.header}>
        <div className={styles.title}>
          <span className={`material-icons ${styles.titleItemIcon}`}>mail</span><span>配信先メールアドレス</span>
        </div>
        <div>
          <Link className={styles.editButton} to="/delivery-email-address/edit">登録・編集</Link>
        </div>
      </div>
      
      <DeliveryEmailAddressList deliveryEmailAddresses={deliveryEmailAddresses}/>
    </div>
  );
}

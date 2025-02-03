import DeliveryEmailAddressList from "~/components/delivery-email/delivery-email-address-list";
import type { Route } from "./+types/delivery-email-address";
import styles from "./delivery-email-address.module.css";

// export async function loader() {
  
//   return {  };
// }

export default function DeliveryEmailAddress({}: Route.ComponentProps) {
  return (
    <div>
      <div className={styles.header}>
        <div className={styles.title}>
          <h2>配信先メールアドレス</h2>
        </div>
        <div className={styles.button}>
          <button>登録・編集</button>
        </div>
      </div>
      
      <DeliveryEmailAddressList />
    </div>
  );
}
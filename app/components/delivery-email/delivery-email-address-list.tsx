import styles from "./delivery-email-address-list.module.css";

export default function DeliveryEmailList({ }) {
  return (
    <div>
      <div className={styles.titleContainer}>
        <div className={styles.title}>アドレス一覧</div>
      </div>
      <div className={styles.listContainer}>
        <table className={styles.list}>
          <thead>
            <tr>
              <th>宛先名称</th>
              <th>配信先メールアドレス</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>山田　太郎</td>
              <td>yamada.taro@gmail.com</td>
            </tr>
            <tr>
              <td>山田　太郎</td>
              <td>yamada.taro@gmail.com</td>
            </tr>
            <tr>
              <td>山田　太郎</td>
              <td>yamada.taro@gmail.com</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
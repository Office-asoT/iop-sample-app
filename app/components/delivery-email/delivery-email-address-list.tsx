import { useEffect } from "react";
import { useFetcher } from "react-router";
import styles from "./delivery-email-address-list.module.css";

export default function DeliveryEmailList({ deliveryEmailAddresses }) {
  const fetcher = useFetcher();

  const handleDelete = (event, emailAddress) => {
    const isConfirmed = window.confirm(`「${emailAddress}」を削除してもよろしいですか？`);
    if (!isConfirmed) {
      event.preventDefault();
    }
  };

  useEffect(() => {
    if (fetcher.data?.message) {
      window.alert(fetcher.data.message);
      if (fetcher.data.redirectUrl) {
        window.location.href = fetcher.data.redirectUrl;
      }
    }
  }, [fetcher.data]);

  return (
    <div>
      <div className={styles.titleContainer}>
        <div className={styles.title}>アドレス一覧</div>
      </div>
      <div className={styles.listContainer}>
        <table className={styles.list}>
          <thead>
            <tr>
              <th className={styles.listTh}>宛先名称</th>
              <th className={styles.listTh}>配信先メールアドレス</th>
              <th className={styles.listTh}>削除</th>
            </tr>
          </thead>
          <tbody>
            {deliveryEmailAddresses.map(({ deliveryName, emailAddress }, index) => (
              <tr key={index}>
                <td className={styles.listTd}>{deliveryName}</td>
                <td className={styles.listTd}>{emailAddress}</td>
                <td className={styles.listTd}>
                  <fetcher.Form 
                    action="/delivery-email-address/delete"
                    method="post"
                  >
                    <input type="hidden" name="emailAddress" value={emailAddress} />
                    <button 
                      className={`material-icons`} 
                      style={{ cursor: "pointer" }}
                      type="submit"
                      onClick={(event) => handleDelete(event, emailAddress)}
                    >
                      delete
                    </button>
                  </fetcher.Form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

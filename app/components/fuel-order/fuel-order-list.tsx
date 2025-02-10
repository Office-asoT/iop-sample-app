import { useEffect } from "react";
import { useFetcher } from "react-router";
// import EditDeliveryEmailAddressFrom from "~/components/delivery-email/edit-delivery-email-address-form";

import styles from "./fuel-order-list.module.css";

export default function FuelOrderList({ fuelOrderList }) {
  const fetcher = useFetcher();

  const convertDate = (data) => {
    const jstDate = new Date(data);
    const options = {
      timeZone: "Asia/Tokyo",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    };

    return new Intl.DateTimeFormat("ja-JP", options).format(jstDate);
  }
  const handleCancel = (event) => {
    const isConfirmed = window.confirm(`燃料発注のキャンセル依頼をJAに送信してもよいですか？`);
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
        <div className={styles.title}>履歴一覧</div>
      </div>
      <div className={styles.listContainer}>
        <table className={styles.list}>
          <thead>
            <tr className={styles.listTr}>
              <th className={styles.listTh}>発注日時</th>
              <th className={styles.listTh}>圃場名</th>
              <th className={styles.listTh}>発注依頼JA</th>
              <th className={styles.listTh}>燃料種類</th>
              <th className={styles.listTh}>数量</th>
              <th className={styles.listTh}>ステータス</th>
              <th className={`${styles.listTh} ${styles.textCenter}`}>キャンセル</th>
            </tr>
          </thead>
          <tbody>
            {fuelOrderList.map(({ orderDate, farmName, jaBranchOffice, fuelType, quantity, status}, index) => (
              <tr key={index}>
                <td className={styles.listTd}>{convertDate(orderDate)}</td>
                <td className={styles.listTd}>{farmName}</td>
                <td className={styles.listTd}>{jaBranchOffice.name}</td>
                <td className={styles.listTd}>{fuelType}</td>
                <td className={styles.listTd}>{quantity}</td>
                <td className={styles.listTd}>{status}</td>
                <td className={`${styles.listTd} ${styles.textCenter}`}>
                  <fetcher.Form 
                    action="/fuel-order/cancel"
                    method="post"
                  >
                    <input type="hidden" name="userId" value="hoge" />
                    <input type="hidden" name="orderDate" value={orderDate} />
                    <input type="hidden" name="jaBranchOfficeName" value={jaBranchOffice.name} />
                    <input type="hidden" name="jaBranchOfficeEmailAddress" value={jaBranchOffice.emailAddress} />
                    <input type="hidden" name="convertOrderDate" value={convertDate(orderDate)} />
                    <input type="hidden" name="farmFieldName" value={farmName} />
                    <input type="hidden" name="fuelType" value={fuelType} />
                    <input type="hidden" name="quantity" value={quantity} />
                    <button 
                      className={`material-icons ${styles.rowCancelButton}`} 
                      type="submit"
                      onClick={(event) => handleCancel(event)}
                      disabled={"キャンセル依頼中" == status}
                    >
                      cancel
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

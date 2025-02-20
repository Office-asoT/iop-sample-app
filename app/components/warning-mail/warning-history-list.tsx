import { use } from "react";
import { useOutletContext } from "react-router";

import { getFarmFieldName } from "~/utils";

import styles from "./warning-history-list.module.css";

export default function WarningHistoryList({ warningHistoriesPromise }) {

  const warningHistories = use(warningHistoriesPromise);
  const { farmFields } = useOutletContext();

  return (
    <div>
      <div className={styles.titleContainer}>
        <div className={styles.title}>警報履歴</div>
      </div>
      <div className={styles.listContainer}>
        <table className={styles.list}>
          <thead>
            <tr className={styles.listTr}>
              <th className={styles.listTh}>警報日時</th>
              <th className={styles.listTh}>警報名称</th>
              <th className={styles.listTh}>圃場</th>
            </tr>
          </thead>
          <tbody>
            {warningHistories.map(({
              warningDateTime,
              warningName,
              farmFieldId,
            }, index) => (
              <tr key={index}>
                <td className={styles.listTd}>{new Date(warningDateTime).toLocaleString()}</td>
                <td className={styles.listTd}>{warningName}</td>
                <td className={styles.listTd}>{getFarmFieldName(farmFields, farmFieldId)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

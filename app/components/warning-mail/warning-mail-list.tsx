import { use, useEffect } from "react";
import { useFetcher, useOutletContext } from "react-router";

import { DATA_LIST, getFarmFieldName } from "~/utils";

import styles from "./warning-mail-list.module.css";

const displayMonitoringCondition = condition => {
  if (condition === "gte") return "≧";
  if (condition === "lte") return "≦";
  return "";
}

export default function WarningMailList({ warningMailSettingsPromise }) {

  const warningMailSettings = use(warningMailSettingsPromise);
  const { farmFields } = useOutletContext();
  const fetcher = useFetcher();

  const handleDelete = (event, warningName) => {
    const isConfirmed = window.confirm(`「${warningName}」を削除してもよろしいですか？`);
    if (!isConfirmed) {
      event.preventDefault();
    }
  };

  useEffect(() => {
    if (fetcher.data?.message) {
      window.alert(fetcher.data.message);
    }
    if (fetcher.data?.error) {
      console.error(fetcher.data.error);
    }
  }, [fetcher.data]);

  return (
    <div>
      <div className={styles.titleContainer}>
        <div className={styles.title}>警報一覧</div>
      </div>
      <div className={styles.listContainer}>
        <table className={styles.list}>
          <thead>
            <tr className={styles.listTr}>
              <th className={styles.listTh}>有効 / 無効</th>
              <th className={styles.listTh}>警報名称</th>
              <th className={styles.listTh}>圃場</th>
              <th className={styles.listTh}>時間帯</th>
              <th className={styles.listTh}>条件</th>
              <th className={styles.listTh}>継続時間</th>
              <th className={`${styles.listTh} ${styles.textCenter}`}>削除</th>
            </tr>
          </thead>
          <tbody>
            {warningMailSettings.map(({
              id,
              farmFieldId,
              warningName,
              monitoringStartTime,
              monitoringEndTime,
              monitoringSensor,
              monitoringCondition,
              monitoringValue,
              duration,
              enabled,
            }) => (
              <tr key={id}>
                <td className={styles.listTd}>
                  <fetcher.Form
                    action="edit"
                    method="post"
                  >
                    <input
                      type="checkbox"
                      name="enabled"
                      defaultChecked={enabled}
                      value="true"
                      onChange={(event) => {
                        fetcher.submit(event.currentTarget.form);
                      }}
                    />
                    <input type="hidden" name="userId" value="hoge" />
                    <input type="hidden" name="id" value={id} />
                  </fetcher.Form>
                </td>
                <td className={styles.listTd}>{warningName}</td>
                <td className={styles.listTd}>{getFarmFieldName(farmFields, farmFieldId)}</td>
                <td className={styles.listTd}>{`${monitoringStartTime.slice(0, 5)} 〜 ${monitoringEndTime.slice(0, 5)}`}</td>
                <td className={styles.listTd}>{`${DATA_LIST[monitoringSensor].displayName} ${displayMonitoringCondition(monitoringCondition)} ${monitoringValue}`}</td>
                <td className={styles.listTd}>{`${duration} 分`}</td>
                <td className={`${styles.listTd} ${styles.textCenter}`}>
                  <fetcher.Form
                    action="delete"
                    method="post"
                  >
                    <input type="hidden" name="userId" value="hoge" />
                    <input type="hidden" name="id" value={id} />
                    <button
                      className={`material-icons`}
                      style={{ cursor: "pointer" }}
                      type="submit"
                      onClick={(event) => handleDelete(event, warningName)}
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

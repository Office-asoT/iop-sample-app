import { DATA_LIST } from "~/utils";

import styles from "./environment-graph-setting-table.module.css";

export default function EnvrionmentGraphSettingTable({
  farmFieldId,
  displaySetting,
}) {

  return (
    <div className={styles.container}>
      <input
        type="hidden"
        name="farmFieldId"
        defaultValue={farmFieldId}
      />
      <table>
        <thead>
          <tr>
            <th>表示/非表示</th>
            <th>表示項目名</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(displaySetting).map(([itemName, visible]) => (
            <tr
              key={`${farmFieldId}-${itemName}`}
            >
              <td>
                <input
                  type="checkbox"
                  name="visible"
                  defaultChecked={visible}
                  defaultValue={itemName}
                />
              </td>
              <td>{DATA_LIST[itemName].displayName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

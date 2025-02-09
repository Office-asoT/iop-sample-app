import { useSubmit } from "react-router";
import styles from "./edit-fuel-order-target-ja-form.module.css";

export default function EditFuelOrderTargetFrom({ id, farmName, farmFieldId, jaBranchOfficeNumber, jaBranchOfficeList }) {

  return (
    <tr key={id}>
      <td className={`${styles.listTd} ${styles.farmName}`}>
        {farmName}
      </td>
      <td className={styles.listTd}>
        <input type="hidden" name="farmId" value={farmFieldId} />
        <label className={styles.selectContainer}>
          <select className={styles.selectJa} defaultValue={jaBranchOfficeNumber} name="jaBranchOfficeNumber">
            {jaBranchOfficeList.map((jaBranchOffice) => (
              <option key={jaBranchOffice.number} value={jaBranchOffice.number}>
                {jaBranchOffice.name}
              </option>
            ))}
          </select>
        </label>
      </td>
    </tr>
  );
}

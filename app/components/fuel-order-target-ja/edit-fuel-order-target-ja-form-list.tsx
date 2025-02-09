import { Form, Link } from "react-router";
import EditFuelOrderTargetFrom from "~/components/fuel-order-target-ja/edit-fuel-order-target-ja-form";

import styles from "./edit-fuel-order-target-ja-form-list.module.css";

export default function EditFuelOrderTargetJAFormList({ fuelOrderTargetList, jaBranchOfficeList }) {

  return (
    <div>
      <div className={styles.titleContainer}>
        <div className={styles.title}>燃料発注先JA 一覧</div>
      </div>
      <div className={styles.listContainer}>
        <Form 
          action="/fuel-order-target-ja/update"
          method="post"
          >
          <table className={styles.list}>
            <thead>
              <tr className={styles.listTr}>
                <th className={styles.listTh}>圃場名</th>
                <th className={styles.listTh}>発注依頼JA</th>
              </tr>
            </thead>
            <tbody>
              {fuelOrderTargetList.map(({ farm_name, farm_field_id, ja_branch_office }, index) => (
                <EditFuelOrderTargetFrom 
                  key={index}
                  id={index}
                  farmName ={farm_name} 
                  farmFieldId={farm_field_id}
                  jaBranchOfficeNumber={ja_branch_office.number}
                  jaBranchOfficeList={jaBranchOfficeList}
                />
              ))}
            </tbody>
          </table>
          <div className={styles.buttonContainer}>
            <button className={`${styles.submitButton} ${styles.baseButton}`} type="submit" >保存する</button>
            <Link className={`${styles.cancelButton} ${styles.baseButton}`} to="/fuel-order-target-ja">キャンセル</Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

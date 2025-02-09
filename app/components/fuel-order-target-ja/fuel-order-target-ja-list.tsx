import styles from "./fuel-order-target-ja-list.module.css";

export default function FuelOrderTargetJaList({ fuelOrderTargetList }) {
  return (
    <div>
      <div className={styles.titleContainer}>
        <div className={styles.title}>燃料発注先JA 一覧</div>
      </div>
      <div className={styles.listContainer}>
        <table className={styles.list}>
          <thead>
            <tr>
              <th className={styles.listTh}>圃場名</th>
              <th className={styles.listTh}>発注依頼JA</th>
            </tr>
          </thead>
          <tbody>
            {fuelOrderTargetList.map(({ farm_name, ja_branch_office }, index) => (
              <tr key={index}>
                <td className={styles.listTd}>{farm_name}</td>
                <td className={styles.listTd}>{ja_branch_office['name']}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import styles from "./farm-field-location.module.css";

export default function FarmFieldLocation({ location }) {
  if (!location) {
    return <div className={styles.location}>クリックして地点を選択してください。</div>;
  }

  return (
    <div className={styles.location}>
      <h2 className={styles.title}>圃場情報</h2>
      <table className={styles.styledTable}>
        <tbody>
          <tr>
            <th>圃場名称</th>
            <td>{location.name}</td>
          </tr>
          <tr>
            <th>住所</th>
            <td>{location.address}</td>
          </tr>
          <tr>
            <th>栽培作物</th>
            <td>{location.crop}</td>
          </tr>
          <tr>
            <th>定植日</th>
            <td>{location.plantingDate}</td>
          </tr>
          <tr>
            <th>普及所</th>
            <td>{location.extensionOffice}</td>
          </tr>
          <tr>
            <th>燃料発注先のJA</th>
            <td>{location.jaBranchOfficeName}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

import { Link } from "react-router";

import styles from "./side-menu.module.css";

export default function SideMenu({ isMenuOpen, closeMenu }) {
  return (
    <aside className={`${styles.sideMenu} ${isMenuOpen ? styles.open : ""}`}>
      <ul className={styles.sideMenuList}>
        <Link to="/" onClick={closeMenu}>
          <li className={styles.sideMenuItem}>
            <span className={`material-icons ${styles.sideMenuItemIcon}`}>home</span>
            <span className={styles.sideMenuItemText}>ホーム</span>
          </li>
        </Link>
        <Link to="/graph" onClick={closeMenu}>
          <li className={styles.sideMenuItem}>
            <span className={`material-icons ${styles.sideMenuItemIcon}`}>query_stats</span>
            <span className={styles.sideMenuItemText}>グラフ</span>
          </li>
        </Link>
        <Link to="/farm-field" onClick={closeMenu}>
          <li className={styles.sideMenuItem}>
            <span className={`material-icons ${styles.sideMenuItemIcon}`}>gite</span>
            <span className={styles.sideMenuItemText}>圃場</span>
          </li>
        </Link>
        <Link to="/warning-email" onClick={closeMenu}>
          <li className={styles.sideMenuItem}>
            <span className={`material-icons ${styles.sideMenuItemIcon}`}>mail</span>
            <span className={styles.sideMenuItemText}>警報メール</span>
          </li>
        </Link>
        <Link to="/fuel-order" onClick={closeMenu}>
          <li className={styles.sideMenuItem}>
            <span className={`material-icons ${styles.sideMenuItemIcon}`}>local_gas_station</span>
            <span className={styles.sideMenuItemText}>燃料発注</span>
          </li>
        </Link>
      </ul>
    </aside>
  );
};

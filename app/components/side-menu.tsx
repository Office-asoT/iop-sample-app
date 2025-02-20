import { Link } from "react-router";

import styles from "./side-menu.module.css";

export default function SideMenu({ isMenuOpen, closeMenu }) {
  return (
    <aside className={`${styles.sideMenu} ${isMenuOpen ? styles.open : ""}`}>
      <ul className={styles.sideMenuList}>
        <li className={styles.sideMenuItem}>
          <Link to="/" onClick={closeMenu}>
            <span className={`material-icons ${styles.sideMenuItemIcon}`}>home</span>
            <span className={styles.sideMenuItemText}>ホーム</span>
          </Link>
        </li>
        <li className={styles.sideMenuItem}>
          <Link to="/graph" onClick={closeMenu}>
            <span className={`material-icons ${styles.sideMenuItemIcon}`}>query_stats</span>
            <span className={styles.sideMenuItemText}>グラフ</span>
          </Link>
        </li>
        <li className={styles.sideMenuItem}>
          <Link to="/farm-field" onClick={closeMenu}>
            <span className={`material-icons ${styles.sideMenuItemIcon}`}>gite</span>
            <span className={styles.sideMenuItemText}>圃場</span>
          </Link>
        </li>
        <li className={styles.sideMenuItem}>
          <Link to="/warning-mail" onClick={closeMenu}>
            <span className={`material-icons ${styles.sideMenuItemIcon}`}>notifications_active</span>
            <span className={styles.sideMenuItemText}>警報メール</span>
          </Link>
        </li>
        <li className={styles.sideMenuItem}>
          <Link to="/fuel-order" onClick={closeMenu}>
            <span className={`material-icons ${styles.sideMenuItemIcon}`}>local_gas_station</span>
            <span className={styles.sideMenuItemText}>燃料発注</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
};

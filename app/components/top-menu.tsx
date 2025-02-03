import { Link } from "react-router";
import { useState, useEffect, useRef } from 'react';
import styles from "./top-menu.module.css";

export default function TopMenu({ toggleMenu }) {
  const [showUserMenu, setShowUserMenu] = useState(false);

  const userMenuButtonRef = useRef(null);
  const userMenuRef = useRef(null);

  const clickOutside = event => {
    console.log(userMenuButtonRef.current);
    if (userMenuButtonRef.current && userMenuButtonRef.current.contains(event.target)) return;
    if (!userMenuRef.current) return;
    if (userMenuRef.current.contains(event.target)) return;
    setShowUserMenu(false);
  };

  useEffect(() => {
    document.addEventListener("click", clickOutside);
    return () => {
      document.removeEventListener("click", clickOutside);
    };
  }, []);

  const handleShowMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  const closeMenu = () => {
    setShowUserMenu(false);
  };

  return (
    <nav className={styles.topMenu}>
      <div className={styles.appName}>サンプルアプリ</div>
      <div>
        {/* PC時はメニューを横並びで表示してもOKだが、ここでは最小構成としてボタンのみ */}
        <button className={styles.menuButton} onClick={toggleMenu}>☰</button>
      </div>
      <div ref={userMenuButtonRef} className={styles.userMenuButton} onClick={handleShowMenu}>
        <span>{"hoge"}</span>
        <span className={`material-icons ${styles.userIcon}`}>account_circle</span>
      </div>
      {showUserMenu && (
          <ul ref={userMenuRef} className={styles.headerMenu}>
            <li>
              <Link to="/delivery-email-address" onClick={closeMenu}>
                <span className={`material-icons ${styles.sideMenuItemIcon}`}>mail</span>
                <span className={styles.deliveryEmail}>配信先アドレス</span>
              </Link>
            </li>
            <li>
              <Link to="/fuel-order-ja" onClick={closeMenu}>
                <span className={`material-icons ${styles.sideMenuItemIcon}`}>local_gas_station</span>
                <span className={styles.deliveryEmail}>燃料発注先JA</span>
              </Link>
            </li>
          </ul>
        )}
    </nav>
  );
};
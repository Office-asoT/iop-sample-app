import styles from "./top-menu.module.css";

export default function TopMenu({ toggleMenu }) {
  return (
    <nav className={styles.topMenu}>
      <div className={styles.topMenuTitle}>サンプルアプリ</div>
      <div className={styles.topMenuRight}>
        {/* PC時はメニューを横並びで表示してもOKだが、ここでは最小構成としてボタンのみ */}
        <button className={styles.menuButton} onClick={toggleMenu}>
          ☰
        </button>
      </div>
    </nav>
  );
};

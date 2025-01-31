import { useState } from "react";
import { Outlet } from "react-router";

import TopMenu from "~/components/top-menu";
import SideMenu from "~/components/side-menu";

import styles from "./main-layout.module.css";

export default function MainLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <main className={styles.appContainer}>
      <TopMenu toggleMenu={toggleMenu} />
      <div className={styles.mainContent}>
        <SideMenu isMenuOpen={isMenuOpen} closeMenu={closeMenu} />
        <div className={styles.contentArea}>
          <Outlet />
        </div>
      </div>
    </main>
  );
}

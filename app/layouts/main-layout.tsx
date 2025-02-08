import { useState } from "react";
import { Outlet } from "react-router";

import type { Route } from "./+types/main-layout";

import TopMenu from "~/components/top-menu";
import SideMenu from "~/components/side-menu";

import styles from "./main-layout.module.css";

const getFarmFields = async (userId: string) => {
  const response = await fetch(`http://localhost:8000/api/farm_fields/${userId}`);
  if (response.status !== 200) throw response;
  const data = await response.json();
  return data;
}

const getDisplaySettings = async (userId: string) => {
  const response = await fetch(`http://localhost:8000/api/display_settings/${userId}`);
  if (response.status !== 200) throw response;
  const data = await response.json();
  return data.reduce((result, { farm_field_id, setting }) => {
    result[farm_field_id] = setting;
    return result;
  }, {});
}

export async function loader() {
  const userId = "hoge";
  const farmFields = await getFarmFields(userId);
  const displaySettings = await getDisplaySettings(userId);
  return {
    userId,
    farmFields,
    displaySettings,
  }
}

export default function MainLayout({
  loaderData,
}: Route.ComponentProps) {
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
          <Outlet context={{ ...loaderData }} />
        </div>
      </div>
    </main>
  );
}

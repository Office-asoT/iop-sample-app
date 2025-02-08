import { Suspense, useState } from "react";

import HomeContent from "../home-content";
import GraphList from "./graph-list";
import EnvironmentGraphSettingPopup from "./environment-graph-setting-popup";

import styles from "./environment-graph.module.css";

export default function EnvironmentGraph({ todaySensorsDataPromise }) {

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <HomeContent
      title="環境情報グラフ"
      iconName="show_chart"
      onClickSetting={togglePopup}
    >
      <div className={styles.container}>
        {isPopupOpen && (
        <EnvironmentGraphSettingPopup
          onClose={togglePopup}
        />
      )}
        <Suspense fallback={<p>Loading...</p>}>
          <GraphList
            todaySensorsDataPromise={todaySensorsDataPromise}
          />
        </Suspense>
      </div>
    </HomeContent>
  );
};

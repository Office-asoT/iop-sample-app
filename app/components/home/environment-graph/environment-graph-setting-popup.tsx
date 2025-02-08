import { useState } from "react";
import { Form, useOutletContext } from "react-router";

import EnvironmentGraphSettingTable from "./environment-graph-setting-table";
import { getFarmFieldName } from "~/utils";

import styles from "./environment-graph-setting-popup.module.css";

export default function EnvironmentGraphSettingPopup({ onClose }) {
  const { farmFields, displaySettings } = useOutletContext();

  const farmFieldIds = Object.keys(displaySettings);
  const [activeTab, setActiveTab] = useState(farmFieldIds[0]);

  const handleClickTab = (event, farmFieldId) => {
    event.preventDefault();
    setActiveTab(farmFieldId);
  };

  return (
    <>
      <div className={styles.overlay} onClick={onClose}></div>
      <div className={styles.container}>
        <div className={styles.title}>
          <span>環境情報グラフ表示設定</span>
          <span className={styles.closeButton} onClick={onClose}>×</span>
        </div>
        <Form
          action="/environment-graph/edit"
          method="post"
          onSubmit={onClose}
        >
          <input type="hidden" name="userId" value="hoge" />
          <div className={styles.tabs}>
            {farmFieldIds.map(farmFieldId => (
              <button
                key={farmFieldId}
                className={`${styles.tab} ${activeTab === farmFieldId ? styles.activeTab : ""}`}
                onClick={event => handleClickTab(event, farmFieldId)}
              >
                <span>{getFarmFieldName(farmFields, farmFieldId)}</span>
              </button>
            ))}
          </div>
          {farmFieldIds.map(farmFieldId =>
            activeTab === farmFieldId ? (
              <EnvironmentGraphSettingTable
                key={farmFieldId}
                farmFieldId={farmFieldId}
                displaySetting={displaySettings[farmFieldId]["home"]["environment-graph"]}
              />
            ) : null
          )}
          <div className={styles.buttonGroup}>
            <button type="submit">変更する</button>
          </div>
        </Form >
      </div >
    </>
  );
};

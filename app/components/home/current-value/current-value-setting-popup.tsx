import { useState } from "react";
import { Form, useOutletContext } from "react-router";

import CurrentvalueSettingTable from "./curretn-value-setting-table";
import { getFarmFieldName } from "~/utils";

import styles from "./current-value-setting-popup.module.css";

export default function CurrentValueSettingPopup({ onClose }) {
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
          <span>現在値表示設定</span>
          <span className={styles.closeButton} onClick={onClose}>×</span>
        </div>
        <Form
          action="/current-value/edit"
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
              <CurrentvalueSettingTable
                key={farmFieldId}
                farmFieldId={farmFieldId}
                displaySetting={displaySettings[farmFieldId]["home"]["current-value"]}
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

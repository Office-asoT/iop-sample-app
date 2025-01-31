import { Form } from "react-router";

import styles from "./wf-location-setting-popup.module.css";

export default function WFLocationSettingPopup({ municipalities, onClose, currentMunicipality }) {
  return (
    <>
      <div className={styles.popupOverlay} onClick={onClose}></div>
      <div className={styles.popupContainer}>
        <div className={styles.popupTitle}>気象情報表示地点
          <span className={styles.closeButton} onClick={onClose}>×</span>
        </div>
        <Form
          action="/weather-forecast/edit"
          method="post"
          onSubmit={onClose}
        >
          <input type="hidden" name="userId" value="hoge" />
          <select defaultValue={currentMunicipality.code} name="municipalityCode">
            <option value="">-- 市町村を選択 --</option>
            {municipalities.map((municipality) => (
              <option key={municipality.code} value={municipality.code}>
                {municipality.name}
              </option>
            ))}
          </select>
          <br />
          <div className={styles.buttonGroup}>
            <button type="submit">変更する</button>
          </div>
        </Form>
      </div>
    </>
  );
};

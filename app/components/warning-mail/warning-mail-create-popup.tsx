import { useState, useEffect } from "react";
import { useFetcher, useOutletContext } from "react-router";

import { DATA_LIST } from "~/utils";
import styles from "./warning-mail-create-popup.module.css";

const validateWarningName = (value: string) => {
  if (value === "") {
    return "警報名称を入力してください";
  }
  return "";
};

const validateMonitoringTime = (value: string) => {
  if (value === "") {
    return "時間帯を入力してください";
  }
  return "";
};

const validateMonitoringValue = (value: string) => {
  if (value === "") {
    return "条件に数値を入力してください";
  }
  return "";
}

const validateDuration = (value: string) => {
  if (value === "") {
    return "継続時間を入力してください";
  }
  return "";
};

const validator = {
  warningName: validateWarningName,
  monitoringStartTime: validateMonitoringTime,
  monitoringEndTime: validateMonitoringTime,
  monitoringValue: validateMonitoringValue,
  duration: validateDuration,
};

export default function WarningMailCreatePopup({ onClose }) {
  const { farmFields } = useOutletContext();
  const fetcher = useFetcher();

  const [formValues, setFormValues] = useState({
    warningName: "",
    monitoringStartTime: "",
    monitoringEndTime: "",
    monitoringValue: "",
    duration: "",
  });

  const [errors, setErrors] = useState({
    warningName: "",
    monitoringStartTime: "",
    monitoringEndTime: "",
    monitoringValue: "",
    duration: "",
  });

  useEffect(() => {
    if (fetcher.state !== "idle") return;
    if (!fetcher.data) return;
    if (fetcher.data.ok === false) {
      console.error(fetcher.data.error);
    }
    onClose();
  }, [fetcher.state, fetcher.data]);

  const validate = () => {
    const newErrors = Object.entries(formValues).reduce((result, [name, value]) => {
      result[name] = validator[name](value);
      return result;
    }, {});
    setErrors(newErrors);
    return Object.values(newErrors).every(value => value === "");
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setFormValues(prevState => ({ ...prevState, [name]: value }));
    setErrors(prevState => ({ ...prevState, [name]: validator[name](value) }));
  }

  const handleSubmit = (event) => {
    if (!validate()) {
      event.preventDefault();
    }
  }

  return (
    <>
      <div className={styles.popupOverlay} onClick={onClose}></div>
      <div className={styles.popupContainer}>
        <div className={styles.popupTitleContainer}>
          <div className={styles.popupTitle}>新規登録</div>
          <span className={styles.closeButton} onClick={onClose}>×</span>
        </div>
        <fetcher.Form
          action="/warning-mail/create"
          method="post"
        >
          <input type="hidden" name="userId" value="hoge" />
          <div className={styles.inputContainer}>
            <div className={styles.title}>警報名称</div>
            <input
              className={styles.textInput}
              type="text"
              name="warningName"
              onChange={handleChange}
            />
            {errors.warningName && <p className={styles.errorMessage}>{errors.warningName}</p>}
          </div>
          <div className={styles.inputContainer}>
            <div className={styles.title}>圃場名</div>
            <div className={styles.selectContainer}>
              <select
                className={styles.select}
                name="farmFieldId"
              >
                {farmFields.map(({ id, name }) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className={styles.inputContainer}>
            <div className={styles.title}>時間帯</div>
            <div className={styles.monitoringTimeContainer}>
              <input
                className={styles.timeInput}
                type="time"
                name="monitoringStartTime"
                onChange={handleChange}
              />
              <span>〜</span>
              <input
                className={styles.timeInput}
                type="time"
                name="monitoringEndTime"
                onChange={handleChange}
              />
            </div>
            {(errors.monitoringStartTime || errors.monitoringEndTime) && (
              <p className={styles.errorMessage}>{errors.monitoringStartTime || errors.monitoringEndTime}</p>
            )}
          </div>
          <div className={styles.inputContainer}>
            <div className={styles.title}>条件</div>
            <div className={styles.monitoringConditionContainer}>
              <div className={styles.selectContainer}>
                <select
                  className={styles.select}
                  name="monitoringSensor"
                >
                  {Object.entries(DATA_LIST).map(([dataName, { displayName }]) => (
                    <option key={dataName} value={dataName}>{displayName}</option>
                  ))}
                </select>
              </div>
              <div className={styles.selectContainer}>
                <select
                  className={`${styles.select} ${styles.monitoringConditionInput}`}
                  name="monitoringCondition"
                >
                  <option value="gte">≧</option>
                  <option value="lte">≦</option>
                </select>
              </div>
              <input
                className={styles.numberInput}
                type="number"
                name="monitoringValue"
                onChange={handleChange}
              />
            </div>
            {errors.monitoringValue && <p className={styles.errorMessage}>{errors.monitoringValue}</p>}
          </div>
          <div className={styles.inputContainer}>
            <div className={styles.title}>継続時間（分）</div>
            <input
              className={styles.numberInput}
              type="number"
              min="1"
              max="60"
              name="duration"
              onChange={handleChange}
            />
            {errors.duration && <p className={styles.errorMessage}>{errors.duration}</p>}
          </div>
          <div className={styles.inputContainer}>
            <div className={styles.title}>有効 / 無効</div>
            <div className={styles.enabledContainer}>
              <div>
                <input
                  className={styles.numberInput}
                  type="radio"
                  id="true"
                  name="enabled"
                  value="true"
                  defaultChecked={true}
                />
                <label htmlFor="true">有効</label>
              </div>
              <div>
                <input
                  className={styles.numberInput}
                  type="radio"
                  id="false"
                  name="enabled"
                  value="false"
                />
                <label htmlFor="false">無効</label>
              </div>
            </div>
          </div>
          <br />
          <div className={styles.buttonGroup}>
            <button
              className={`${styles.submitButton} ${styles.baseButton}`}
              type="submit"
              onClick={handleSubmit}
            >登録する</button>
          </div>
        </fetcher.Form>
      </div>
    </>
  );
};

import { use } from "react";

import CurrentValueDataCard from "./current-value-data-card";

import styles from "./current-value-data-list.module.css";

export default function CurrentValueDataList({ latestSensorsDataPromise }) {
  const latestSensorsData = use(latestSensorsDataPromise);
  return (
    <div className={styles.container}>
      {Object.entries(latestSensorsData).map(([farmFieldId, sensorsData]) => (
        <CurrentValueDataCard
          key={farmFieldId}
          farmFieldId={farmFieldId}
          sensorsData={sensorsData}
        />
      ))}
    </div>
  );
}

import { use } from "react";

import GraphCard from "./graph-card";

import styles from "./graph-list.module.css";

export default function GraphList({ todaySensorsDataPromise }) {

  const todaySensorsData = use(todaySensorsDataPromise);

  return (
    <div className={styles.container}>
      {Object.entries(todaySensorsData).map(([farmFieldId, sensorsData]) => (
        <GraphCard
          key={farmFieldId}
          farmFieldId={farmFieldId}
          sensorsData={sensorsData}
        />
      ))}
    </div>
  );
}

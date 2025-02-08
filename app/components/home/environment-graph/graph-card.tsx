import { useOutletContext } from "react-router";

import Graph from "./graph";
import { getFarmFieldName } from "~/utils";

import styles from "./graph-card.module.css";

export default function GraphCard({
  farmFieldId,
  sensorsData,
}) {
  const { farmFields } = useOutletContext();
  return (
    <div className={styles.container}>
      <p>{getFarmFieldName(farmFields, farmFieldId)}</p>
      <Graph
        farmFieldId={farmFieldId}
        sensorsData={sensorsData}
      />
    </div>
  );
}

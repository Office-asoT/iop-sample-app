import { DATA_LIST } from "~/utils";

import styles from "./current-value-data-item.module.css";

interface CurrentValueDataItemProps {
  dataName: string;
  value: number;
  unit: string;
}

export default function CurrentValueDataItem({
  dataName,
  value,
}: CurrentValueDataItemProps) {
  return (
    <div className={styles.container}>
      <p>{DATA_LIST[dataName].displayName}</p>
      <p>{`${value} ${DATA_LIST[dataName].unit}`}</p>
    </div>
  );
}

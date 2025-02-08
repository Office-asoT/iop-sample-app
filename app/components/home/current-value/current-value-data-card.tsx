import { useOutletContext } from "react-router";

import CurrentValueDataItem from "./current-value-data-item";
import { getFarmFieldName } from "~/utils";

import styles from "./current-value-data-card.module.css";

interface CurrentValueDataCardProps {
  farmFieldId: string;
}

const getTimestamp = (sensorsData) => {
  return Object.values(sensorsData)[0][0].timestamp;
}

export default function CurrentValueDataCard({
  farmFieldId,
  sensorsData,
}: CurrentValueDataCardProps) {

  const { farmFields, displaySettings } = useOutletContext();

  return (
    <div className={`bg-gray-200 ${styles.container}`}>
      <div className={styles.header}>
        <p>{getFarmFieldName(farmFields, farmFieldId)}</p>
        <p>{getTimestamp(sensorsData)}</p>
      </div>
      <ul className={styles.dataList}>
        {Object.entries(displaySettings[farmFieldId]["home"]["current-value"]).map(([dataName, visible]) => (
          visible ? (
            <li key={`${farmFieldId}-${dataName}`}>
              <CurrentValueDataItem
                dataName={dataName}
                value={sensorsData[dataName][0].value}
              />
            </li>
          ) : null
        ))}
      </ul>
    </div>
  );
}

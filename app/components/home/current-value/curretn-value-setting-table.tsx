import { useRef } from "react";

import { DATA_LIST } from "~/utils";

import styles from "./curretn-value-setting-table.module.css";

export default function CurrentValueSettingTable({
  farmFieldId,
  displaySetting,
}) {

  const draggedRowRef = useRef(null);
  const tableBodyRef = useRef(null);

  const handleDragStart = (event) => {
    draggedRowRef.current = event.target;
    event.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    const draggingOverRow = event.target.closest("tr");
    if (draggingOverRow && draggingOverRow !== draggedRowRef.current) {
      const rect = draggingOverRow.getBoundingClientRect();
      const next = event.clientY > rect.top + rect.height / 2;
      tableBodyRef.current.insertBefore(draggedRowRef.current, next ? draggingOverRow.nextSibling : draggingOverRow);
    }
  };

  const handleDragEnd = () => {
    draggedRowRef.current = null;
  };

  return (
    <div className={styles.container}>
      <input
        type="hidden"
        name="farmFieldId"
        defaultValue={farmFieldId}
      />
      <table>
        <thead>
          <tr>
            <th>表示/非表示</th>
            <th>表示項目名</th>
            <th>表示順</th>
          </tr>
        </thead>
        <tbody ref={tableBodyRef}>
          {Object.entries(displaySetting).map(([itemName, visible]) => (
            <tr
              key={`${farmFieldId}-${itemName}`}
              draggable="true"
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDragEnd={handleDragEnd}
            >
              <td>
                <input
                  type="checkbox"
                  name="visible"
                  defaultChecked={visible}
                  defaultValue={itemName}
                />
              </td>
              <td>{DATA_LIST[itemName].displayName}</td>
              <td>
                <span className="material-icons">reorder</span>
                <input
                  type="hidden"
                  name="order"
                  defaultValue={itemName}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

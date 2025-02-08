import React, { useRef, useEffect } from "react";
import styles from "~/components/farm-field//farm-field-map.module.css";
import { FarmFieldMapWidget } from "~/components/farm-field/farm-field-map-widget";

export default function FarmFieldMap({farmFieldList, onSelectLocation}) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current === null) {
      mapRef.current = new FarmFieldMapWidget(containerRef.current, farmFieldList, onSelectLocation);
    }

  }, [onSelectLocation]);
  return (
    <div>
      <div
        ref={containerRef}
        className={styles.map}
      ></div>
    </div>
  );
}

import React, { useRef, useEffect } from "react";
import styles from "~/components/farm-field//farm-field-map.module.css";
import { FarmFieldMapWidget } from "~/components/farm-field/farm-field-map-widget";

export default function FarmFieldMap({farmFieldList, onSelectLocation}) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current === null) {
      mapRef.current = new FarmFieldMapWidget(containerRef.current, farmFieldList);
    }

    const map = mapRef.current;

    // ピンをクリックしたときのイベント
    map.map.on("click", (event) => {
      const feature = map.map.forEachFeatureAtPixel(event.pixel, (feat) => feat);
      if (feature) {
        const selectedLocation = {
          name: feature.get("name"),
          address: feature.get("address"),
          crop: feature.get("crop"),
          plantingDate: feature.get("plantingDate"),
          extensionOffice: feature.get("extensionOffice"),
          jaFuelSupplier: feature.get("jaFuelSupplier")
        };
        onSelectLocation(selectedLocation);
      }
    });

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
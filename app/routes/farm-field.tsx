import { useState } from "react";
import FarmFieldMap from "~/components/farm-field/farm-field-map";
import FarmFieldLocation from "~/components/farm-field/farm-field-location";
import styles from "./farm-field.module.css";
import type { Route } from "./+types/farm-field";

const getFarmFieldList = async (userId: string) => {
  const host = import.meta.env.VITE_IOP_SAMPLE_WEB_API_HOST;
  const response = await fetch(`http://${host}:8000/api/farm_fields/${userId}`);
  if (response.status !== 200) throw response;
  const data = await response.json();
  return data;
}

export async function loader() {
  const farmFieldList = await getFarmFieldList("hoge");
  return farmFieldList;
}

export default function FarmField({
  loaderData
}: Route.ComponentProps) {
  const farmFieldList = loaderData;
  const [selectedLocation, setSelectedLocation] = useState(null);
  return (
    <div>
      <h2 className={styles.title}>圃場</h2>
      <FarmFieldMap
        farmFieldList={farmFieldList}
        onSelectLocation={setSelectedLocation}
      />
      <FarmFieldLocation location={selectedLocation} />
    </div>
  );
}

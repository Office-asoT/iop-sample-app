import PageHeader from "~/components/page-header";
import FuelOrderTargetJaList from "~/components/fuel-order-target-ja/fuel-order-target-ja-list";

import type { Route } from "./+types/fuel-order-target-ja";

const getfuelOrderTargetJaList = async (userId: string) => {
  const host = import.meta.env.VITE_IOP_SAMPLE_WEB_API_HOST;
  const response = await fetch(`http://${host}:8000/api/fuel_order_target_jas/${userId}`);
  if (response.status !== 200) throw response;
  const data = await response.json();
  return data;
}

const getFarmFieldList = async (userId: string) => {
  const host = import.meta.env.VITE_IOP_SAMPLE_WEB_API_HOST;
  const response = await fetch(`http://${host}:8000/api/farm_fields/${userId}`);
  if (response.status !== 200) throw response;
  const data = await response.json();
  return data;
}

export async function loader() {
  const fuelOrderTargetList = await getfuelOrderTargetJaList("hoge");
  const farmFieldList = await getFarmFieldList("hoge");
  const nameMergeFuelOrderTargetList = fuelOrderTargetList.map(fuelOrderTarget => {
    const farm = farmFieldList.find(farmField => farmField.id === fuelOrderTarget.farm_field_id);
    return { ...fuelOrderTarget, farm_name: farm ? farm.name : "" };
  });
  return { nameMergeFuelOrderTargetList };
}

export default function FuelOrderTargetJa({
  loaderData,
}: Route.ComponentProps) {
  const {
    nameMergeFuelOrderTargetList
  } = loaderData;
  return (
    <div>
      <PageHeader
        title="燃料発注先JA"
        iconName="local_gas_station"
        linkTo="/fuel-order-target-ja/edit"
        linkText="編集"
      />
      <FuelOrderTargetJaList fuelOrderTargetList={nameMergeFuelOrderTargetList} />
    </div>
  );
}

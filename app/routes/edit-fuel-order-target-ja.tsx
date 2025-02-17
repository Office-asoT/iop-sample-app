import PageHeader from "~/components/page-header";
import EditFuelOrderTargetJAFormList from "~/components/fuel-order-target-ja/edit-fuel-order-target-ja-form-list";

import type { Route } from "./+types/edit-fuel-order-target-ja";

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

const getJaBranchOfficeList = async () => {
  const host = import.meta.env.VITE_IOP_SAMPLE_WEB_API_HOST;
  const response = await fetch(`http://${host}:8000/api/ja_branch_offices`);
  if (response.status !== 200) throw response;
  const data = await response.json();
  return data;
}

export async function loader() {
  const fuelOrderTargetList = await getfuelOrderTargetJaList("hoge");
  const farmFieldList = await getFarmFieldList("hoge");
  const jaBranchOfficeList = await getJaBranchOfficeList();
  const nameMergeFuelOrderTargetList = fuelOrderTargetList.map(fuelOrderTarget => {
    const farm = farmFieldList.find(farmField => farmField.id === fuelOrderTarget.farm_field_id);
    return { ...fuelOrderTarget, farm_name: farm ? farm.name : "" };
  });
  return { nameMergeFuelOrderTargetList, jaBranchOfficeList };
}

export default function EditFuelOrderTargetJa({
  loaderData,
}: Route.ComponentProps) {
  const {
    nameMergeFuelOrderTargetList,
    jaBranchOfficeList
  } = loaderData;
  return (
    <div>
      <PageHeader
        title="燃料発注先JAの編集"
        iconName="local_gas_station"
      />
      <EditFuelOrderTargetJAFormList
        fuelOrderTargetList={nameMergeFuelOrderTargetList}
        jaBranchOfficeList={jaBranchOfficeList}
      />
    </div>
  );
}

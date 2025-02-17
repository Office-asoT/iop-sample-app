import { useState } from "react";

import PageHeader from "~/components/page-header";
import FuelOrderCreatePopup from "~/components/fuel-order/fule-order-create-popup";
import FuelOrderList from "~/components/fuel-order/fuel-order-list";

import type { Route } from "./+types/fuel-order";

// スネークケースをキャメルケースに変換する関数
const toCamelCase = (str) => {
  return str.replace(/_([a-z])/g, (_, char) => char.toUpperCase());
};

// オブジェクトのキーをキャメルケースに変換する関数
const convertKeysToCamelCase = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map((item) => convertKeysToCamelCase(item));
  } else if (typeof obj === "object" && obj !== null) {
    return Object.keys(obj).reduce((acc, key) => {
      const camelKey = toCamelCase(key);
      acc[camelKey] = convertKeysToCamelCase(obj[key]);
      return acc;
    }, {});
  }
  return obj;
};
const getfuelOrderList = async (userId: string) => {
  const host = import.meta.env.VITE_IOP_SAMPLE_WEB_API_HOST;
  const response = await fetch(`http://${host}:8000/api/fuel_orders/${userId}`);
  if (response.status !== 200) throw response;
  const data = await response.json();
  return data;
}

const getfuelOrderTargetJaList = async (userId: string) => {
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
  const fuelOrderList = await getfuelOrderList("hoge");
  const farmFieldList = await getFarmFieldList("hoge");
  let nameMergeFuelOrderList = []
  if (fuelOrderList) {
    nameMergeFuelOrderList = fuelOrderList.map(fuelOrder => {
      const farm = farmFieldList.find(farmField => farmField.id === fuelOrder.farm_field_id);
      return { ...fuelOrder, farm_name: farm ? farm.name : "" };
    });
  }
  const convetFuelOrderList = convertKeysToCamelCase(nameMergeFuelOrderList)
  return { convetFuelOrderList, farmFieldList };
}



export default function FuelOrder({
  loaderData,
}: Route.ComponentProps) {
  const {
    convetFuelOrderList,
    farmFieldList
  } = loaderData;
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <div>
      <PageHeader
        title="燃料発注先JA"
        iconName="local_gas_station"
        buttonText="新規発注"
        onClickButton={togglePopup}
      />
      {isPopupOpen && (
        <FuelOrderCreatePopup
          farmFieldList={farmFieldList}
          onClose={togglePopup}
        />
      )}
      <FuelOrderList fuelOrderList={convetFuelOrderList} />
    </div>
  );
}

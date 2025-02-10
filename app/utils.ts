export const DATA_LIST = {
  "air_temperature": { displayName: "温度", unit: "℃" },
  "relative_humidity": { displayName: "湿度", unit: "%RH" },
  "co2_concentration": { displayName: "CO2濃度", unit: "ppm" },
  "solar_irradiance": { displayName: "日射量", unit: "W/m2" },
}

export const getFarmFieldName = (farmFields, farmFieldId: string) => {
  const target = farmFields.find(({ id }) => id === farmFieldId);
  if (!target) return null;
  return target.name;
}

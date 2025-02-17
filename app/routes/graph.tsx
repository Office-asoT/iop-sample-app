import { useEffect, useState } from "react";
import { useFetcher, useOutletContext } from "react-router";

import PageHeader from "~/components/page-header";
import GraphSettingPopup from "~/components/graph/graph-setting-popup";

import type { Route } from "./+types/graph";

import {
  DATA_LIST,
  getFarmFieldName,
} from "~/utils";

const getSensorsData = async (userId: string, start: string, end: string) => {
  const params = new URLSearchParams({
    start,
    end,
  });
  const host = import.meta.env.VITE_IOP_SAMPLE_WEB_API_HOST;
  const response = await fetch(`http://${host}:8000/api/sensors_data/${userId}?${params}`);
  if (response.status !== 200) throw response;
  const data = await response.json();
  return data;
}

const buildPlotData = (farmFields, sensorsData, displaySettings) => {
  let count = 1;
  return Object.entries(sensorsData).reduce((result, [farmFieldId, data]) => {
    for (const [dataName, sensorData] of Object.entries(data)) {
      if (!displaySettings[farmFieldId]["graph"][dataName]) continue;
      result.push({
        type: "scatter",
        mode: "lines",
        name: `${getFarmFieldName(farmFields, farmFieldId)} ${DATA_LIST[dataName].displayName}`,
        x: sensorData.map(({ timestamp }) => new Date(timestamp)),
        y: sensorData.map(({ value }) => value),
        yaxis: count === 1 ? "y" : `y${count}`,
        hovertemplate: `%{y} ${DATA_LIST[dataName].unit}`,
      });
      count++;
    }
    return result;
  }, []);
}

const buildPlotLayout = (plotDataLength: number) => {
  const layout = {
    autosize: true,
    height: 600,
    margin: {
      l: 20,
      r: 20,
    },
    legend: {
      orientation: "h",
      x: 0,
      y: 1.0,
      xanchor: 'left',
      yanchor: "bottom",
    },
    hovermode: "x unified",
    dragmode: false,
    yaxis: {
      visible: false,
    },
  };
  for (let i = 2; i <= plotDataLength; i++) {
    layout[`yaxis${i}`] = {
      overlaying: "y",
      visible: false,
    };
  }
  return layout;
}

export async function loader() {
  const userId = "hoge";
  // const now = new Date();
  const now = new Date("2025-02-05");
  const start = new Date(now.setHours(0, 0, 0, 0)).toISOString();
  const end = new Date(now.setHours(23, 59, 59, 999999)).toISOString();
  const sensorsData = await getSensorsData(userId, start, end);
  const today = now.toISOString().split("T")[0];
  return { sensorsData, today };
}

export async function action({
  request,
}: Route.ActionArgs) {
  const formData = await request.formData();
  const startDate = formData.get("startDate");
  const endDate = formData.get("endDate");
  const start = new Date(new Date(startDate).setHours(0, 0, 0, 0)).toISOString();
  const end = new Date(new Date(endDate).setHours(23, 59, 59, 999999)).toISOString();
  const userId = "hoge";
  const sensorsData = await getSensorsData(userId, start, end);
  return { sensorsData }
}

export default function Graph({
  loaderData,
}: Route.ComponentProps) {

  const { sensorsData, today } = loaderData;
  const {
    farmFields,
    displaySettings,
  } = useOutletContext();
  const fetcher = useFetcher();

  const [Plot, setPlot] = useState(null);
  const [plotData, setPlotData] = useState(buildPlotData(farmFields, sensorsData, displaySettings));
  const [plotLayout, setPlotLayout] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const plotConfig = {
    displayModeBar: false,
  };

  useEffect(() => {
    import("react-plotly.js").then((mod) => setPlot(() => mod.default));
  }, []);

  useEffect(() => {
    if (fetcher.data) {
      setPlotData(buildPlotData(farmFields, fetcher.data.sensorsData, displaySettings));
    }
  }, [fetcher.data]);

  useEffect(() => {
    setPlotLayout(buildPlotLayout(plotData.length));
  }, [plotData]);

  if (!Plot) return <p>Loading...</p>;

  return (
    <div>
      {isPopupOpen && (
        <GraphSettingPopup
          onClose={togglePopup}
        />
      )}
      <PageHeader
        title="グラフ"
        iconName="query_stats"
      />
      <div>
        <fetcher.Form method="post">
          <label>
            表示期間：
            <input
              type="date"
              name="startDate"
              defaultValue={today}
            />
            <span> ～ </span>
            <input
              type="date"
              name="endDate"
              defaultValue={today}
            />
          </label>
          <button type="submit">変更</button>
        </fetcher.Form>
        <button onClick={togglePopup}>表示項目の選択</button>
      </div>
      <Plot
        data={plotData}
        layout={plotLayout}
        config={plotConfig}
        style={{ width: "100%", height: "100%" }}
        useResizeHandler={true}
      />
    </div>
  );
}

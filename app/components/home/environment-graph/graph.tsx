import { useEffect, useState } from "react";
import { useOutletContext } from "react-router";

import { DATA_LIST } from "~/utils";

const buildPlotData = (sensorsData, displaySetting) => {
  let count = 1;
  return Object.entries(sensorsData).reduce((result, [dataName, data], index) => {
    if (!displaySetting["home"]["environment-graph"][dataName]) return result;
    result.push({
      type: "scatter",
      mode: "lines",
      name: DATA_LIST[dataName].displayName,
      x: data.map(({ timestamp }) => new Date(timestamp)),
      y: data.map(({ value }) => value),
      yaxis: index === 0 ? "y" : `y${count++}`,
      hovertemplate: `%{y} ${DATA_LIST[dataName].unit}`,
    });
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

export default function Graph({
  farmFieldId,
  sensorsData,
}) {

  const { displaySettings } = useOutletContext();
  const [Plot, setPlot] = useState(null);

  const plotData = buildPlotData(sensorsData, displaySettings[farmFieldId]);
  const plotLayout = buildPlotLayout(plotData.length);
  const plotConfig = {
    displayModeBar: false,
  };

  useEffect(() => {
    import("react-plotly.js").then((mod) => setPlot(() => mod.default));
  }, []);

  if (!Plot) return <p>Loading...</p>;
  return (
    <Plot
      data={plotData}
      layout={plotLayout}
      config={plotConfig}
      style={{ width: "100%", height: "100%" }}
      useResizeHandler={true}
    />
  );
}

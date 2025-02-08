import type { RouteConfig } from "@react-router/dev/routes";
import {
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("layouts/main-layout.tsx", [
    index("routes/home.tsx"),
    route("weather-forecast/edit", "routes/edit-weather-forecast.tsx"),
    route("current-value/edit", "routes/edit-current-value.tsx"),
  ]),
] satisfies RouteConfig;

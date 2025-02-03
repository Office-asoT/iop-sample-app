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
    route("farm-field", "routes/farm-field.tsx"),
  ]),
] satisfies RouteConfig;

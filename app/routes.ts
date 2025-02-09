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
    route("delivery-email-address", "routes/delivery-email-address.tsx"),
    route("delivery-email-address/edit", "routes/edit-delivery-email-address.tsx"),
    route("delivery-email-address/upsert", "routes/upsert-delivery-email-address.tsx"),
    route("delivery-email-address/delete", "routes/delete-delivery-email-address.tsx"),
    route("delivery-email-address/send-test-mail", "routes/send-test-mail-delivery-email-address.tsx"),
    route("farm-field", "routes/farm-field.tsx"),
    route("fuel-order-target-ja", "routes/fuel-order-target-ja.tsx"),
    route("fuel-order-target-ja/edit", "routes/edit-fuel-order-target-ja.tsx"),
    route("fuel-order-target-ja/update", "routes/update-fuel-order-target-ja.tsx"),
  ]),
] satisfies RouteConfig;

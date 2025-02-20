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
    route("environment-graph/edit", "routes/edit-environment-graph.tsx"),
    route("delivery-email-address", "routes/delivery-email-address.tsx"),
    route("delivery-email-address/edit", "routes/edit-delivery-email-address.tsx"),
    route("delivery-email-address/upsert", "routes/upsert-delivery-email-address.tsx"),
    route("delivery-email-address/delete", "routes/delete-delivery-email-address.tsx"),
    route("delivery-email-address/send-test-mail", "routes/send-test-mail-delivery-email-address.tsx"),
    route("farm-field", "routes/farm-field.tsx"),
    route("fuel-order-target-ja", "routes/fuel-order-target-ja.tsx"),
    route("fuel-order-target-ja/edit", "routes/edit-fuel-order-target-ja.tsx"),
    route("fuel-order-target-ja/update", "routes/update-fuel-order-target-ja.tsx"),
    route("fuel-order", "routes/fuel-order.tsx"),
    route("fuel-order/create", "routes/create-fuel-order.tsx"),
    route("fuel-order/cancel", "routes/cancel-fuel-order.tsx"),
    route("graph", "routes/graph.tsx"),
    route("graph/edit", "routes/edit-graph.tsx"),
    route("warning-mail", "routes/warning-mail.tsx"),
    route("warning-mail/create", "routes/create-warning-mail.tsx"),
    route("warning-mail/edit", "routes/edit-warning-mail.tsx"),
    route("warning-mail/delete", "routes/delete-warning-mail.tsx"),
    route("warning-history", "routes/warning-history.tsx"),
  ]),
] satisfies RouteConfig;

import { Suspense, useState } from "react";

import PageHeader from "~/components/page-header";
import WarningMailCreatePopup from "~/components/warning-mail/warning-mail-create-popup";
import WarningMailList from "~/components/warning-mail/warning-mail-list";

import type { Route } from "./+types/warning-mail";

const getWarningMailSettings = async (userId: string) => {
  const host = import.meta.env.VITE_IOP_SAMPLE_WEB_API_HOST;
  const response = await fetch(`http://${host}:8000/api/warning_mail_settings/${userId}`);
  if (response.status !== 200) throw response;
  const data = await response.json();
  return data.map(({
    id,
    farm_field_id,
    warning_name,
    monitoring_start_time,
    monitoring_end_time,
    monitoring_sensor,
    monitoring_condition,
    monitoring_value,
    duration,
    enabled,
  }) => ({
    id,
    farmFieldId: farm_field_id,
    warningName: warning_name,
    monitoringStartTime: monitoring_start_time,
    monitoringEndTime: monitoring_end_time,
    monitoringSensor: monitoring_sensor,
    monitoringCondition: monitoring_condition,
    monitoringValue: monitoring_value,
    duration,
    enabled,
  }));
}

export async function loader() {
  const userId = "hoge";
  const warningMailSettingsPromise = getWarningMailSettings(userId);
  return { warningMailSettingsPromise };
}

export default function WarningMail({
  loaderData,
}: Route.ComponentProps) {

  const {
    warningMailSettingsPromise,
  } = loaderData;

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <div>
      <PageHeader
        title="警報メール"
        iconName="notifications_active"
        linkTo="/warning-history"
        linkText="警報履歴"
        buttonText="新規登録"
        onClickButton={togglePopup}
      />
      {isPopupOpen && (
        <WarningMailCreatePopup
          onClose={togglePopup}
        />
      )}
      <Suspense fallback={<p>Loading...</p>}>
        <WarningMailList
          warningMailSettingsPromise={warningMailSettingsPromise}
        />
      </Suspense>
    </div>
  );
}

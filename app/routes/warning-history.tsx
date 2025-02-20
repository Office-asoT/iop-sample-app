import { Suspense, useState } from "react";

import PageHeader from "~/components/page-header";
import WarningHistoryList from "~/components/warning-mail/warning-history-list";

import type { Route } from "./+types/warning-history";

const getWarningHistories = async (userId: string) => {
  const host = import.meta.env.VITE_IOP_SAMPLE_WEB_API_HOST;
  const response = await fetch(`http://${host}:8000/api/warning_histories/${userId}`);
  if (response.status !== 200) throw response;
  const data = await response.json();
  return data.map(({
    farm_field_id,
    warning_name,
    warning_date_time,
  }) => ({
    farmFieldId: farm_field_id,
    warningName: warning_name,
    warningDateTime: warning_date_time,
  }));
}

export async function loader() {
  const userId = "hoge";
  const warningHistoriesPromise = getWarningHistories(userId);
  return { warningHistoriesPromise };
}

export default function WarningHistory({
  loaderData,
}: Route.ComponentProps) {

  const {
    warningHistoriesPromise,
  } = loaderData;

  return (
    <div>
      <PageHeader
        title="警報メール"
        iconName="notifications_active"
        linkTo="/warning-mail"
        linkText="一覧へ戻る"
      />
      <Suspense fallback={<p>Loading...</p>}>
        <WarningHistoryList
          warningHistoriesPromise={warningHistoriesPromise}
        />
      </Suspense>
    </div>
  );
}

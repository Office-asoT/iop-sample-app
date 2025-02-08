import { Suspense, useState } from "react";

import HomeContent from "../home-content";
import CurrentValueDataList from "./current-value-data-list";
import CurrentValueSettingPopup from "./current-value-setting-popup";

export default function CurrentValue({ latestSensorsDataPromise }) {

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <HomeContent
      title="現在値"
      iconName="sensors"
      onClickSetting={togglePopup}
    >
      <div>
        {isPopupOpen && (
          <CurrentValueSettingPopup
            onClose={togglePopup}
          />
        )}
        <Suspense fallback={<p>Loading...</p>}>
          <CurrentValueDataList
            latestSensorsDataPromise={latestSensorsDataPromise}
          />
        </Suspense>
      </div>
    </HomeContent>
  );
};

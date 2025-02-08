import { Suspense, useState } from "react";

import HomeContent from "./home-content";
import WeatherForecastList from "./weather-forecast-list";
import WFLocationSettingPopup from "./wf-location-setting-popup";

import styles from "./weather-forecast.module.css";

export default function WeatherForecast({ municipalities, selectedMunicipality, weatherForecastPromise }) {

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <HomeContent
      title="気象情報"
      iconName="sunny"
      onClickSetting={togglePopup}
    >
      <div className={styles.weatherForecast}>
        {selectedMunicipality && (
          <>
            {isPopupOpen && (
              <WFLocationSettingPopup
                municipalities={municipalities}
                onClose={togglePopup}
                currentMunicipality={selectedMunicipality}
              />
            )}
            <h2>{selectedMunicipality.name}</h2>
            <Suspense fallback={<p>Loading...</p>}>
              <WeatherForecastList weatherForecastPromise={weatherForecastPromise} />
            </Suspense>
          </>
        )}
      </div>
    </HomeContent>
  );
};

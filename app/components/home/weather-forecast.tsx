import { Suspense, useState } from "react";

import WeatherForecastList from "./weather-forecast-list";
import WFLocationSettingPopup from "./wf-location-setting-popup";

import styles from "./weather-forecast.module.css";

export default function WeatherForecast({ municipalities, selectedMunicipality, weatherForecastPromise }) {

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
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
          <div className={styles.homeSubHeader}>
            <span className="material-icons">sunny</span>
            <span>気象情報</span>
            <span className="material-icons" onClick={togglePopup}>settings</span>
          </div>
          <h2>{selectedMunicipality.name}</h2>
          <Suspense fallback={<p>Loading...</p>}>
            <WeatherForecastList weatherForecastPromise={weatherForecastPromise} />
          </Suspense>
        </>
      )}
    </div>
  );
};

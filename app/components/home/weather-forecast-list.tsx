import { use } from "react";

import styles from "./weather-forecast-list.module.css";

const WEATHER_ICONS = {
  0: "01d", // 晴れ
  1: "02d", // 主に晴れ
  2: "03d", // 曇りがち
  3: "04d", // 曇り
  45: "09d", // 小雨
  48: "09d", // 凍雨
  51: "10d", // 弱い雨
  53: "10d", // 中程度の雨
  55: "10d", // 激しい雨
  61: "09d", // 弱いにわか雨
  63: "09d", // 中程度のにわか雨
  65: "09d", // 激しいにわか雨
  71: "13d", // 弱い雪
  73: "13d", // 中程度の雪
  75: "13d", // 激しい雪
  80: "09d", // 弱いにわか雨
  81: "09d", // 中程度のにわか雨
  82: "09d", // 激しいにわか雨
};

const getWeatherIcon = (weatherCode) => {
  const iconCode = WEATHER_ICONS[weatherCode] || "50d";
  return `https://openweathermap.org/img/wn/${iconCode}.png`;
};

export default function WeatherForecastList({ weatherForecastPromise }) {
  const weatherForecastData = use(weatherForecastPromise);
  return (
    <div className={styles.forecastListContainer}>
      <ul className={styles.forecastItemHeader}>
        <li className="date"><p>日</p></li>
        <li className="date"><p>時</p></li>
        <li className="weather"><p>天気</p></li>
        <li className="temp"><p>気温</p></li>
        <li className="rain"><p>降水量</p></li>
        <li className="wind-speed"><p>風速</p></li>
        <li className="wind"><p>風向</p></li>
      </ul>
      <div className={styles.forecastItemBody}>
        {weatherForecastData.map((hour, index) => (
          <ul className={styles.forecastItem} key={index}>
            <li>
              <p>{new Date(hour.time).toLocaleString('ja-JP', {
                month: '2-digit',
                day: '2-digit',
              })}</p>
            </li>
            <li>
              <p>{new Date(hour.time).toLocaleString('ja-JP', {
                hour: '2-digit',
              })}</p>
            </li>
            <li>
              <img
                src={getWeatherIcon(hour.weatherCode)}
                alt="weather icon"
                className={styles.weatherIcon}
              />
            </li>
            <li><p>{hour.temperature}<span className={styles.weatherDataUnit}>°C</span></p></li>
            <li><div><p>{hour.precipitation}</p><span className={styles.weatherDataUnit}>mm</span></div></li>
            <li><div><p>{hour.windSpeed}</p> <span className={styles.weatherDataUnit}>m/s</span></div></li>
            <li>
              <div className={styles.windContainer}>
                <img
                  src="/assets/img/arrow.png"
                  alt="Wind Direction"
                  className={styles.windArrow}
                  style={{ transform: `rotate(${hour.windDirection}deg)` }}
                />
              </div>
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
};

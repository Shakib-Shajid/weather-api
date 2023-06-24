import React, { useEffect, useState } from "react";
import WeatherCard from "./weatherCard";
import "./style.css";

const Temp = () => {
  const [searchValue, setSearchValue] = useState("dhaka");
  const [tempInfo, setTempInfo] = useState({});

  const getWeatherInfo = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=43fa5b800777b5622e77d07748d22037`;

      const res = await fetch(url);
      const data = await res.json();

      const { temp, humidity, pressure } = data.main;
      const { main: weathermood } = data.weather[0];
      const { name } = data;
      const { speed } = data.wind;
      const { country, sunset } = data.sys;

      const myNewWeatherInfo = {
        temp,
        humidity,
        pressure,
        weathermood,
        name,
        country,
        speed,
        sunset,
      };
      setTempInfo(myNewWeatherInfo);

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWeatherInfo();
  }, []);
  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="search..."
            id="search"
            autoFocus
            className="searchTerm"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button
            className="searchButton"
            type="button"
            onClick={getWeatherInfo}
          >
            Search
          </button>
        </div>
      </div>
      <WeatherCard tempInfo={tempInfo} />
    </>
  );
};

export default Temp;

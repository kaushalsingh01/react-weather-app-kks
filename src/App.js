import React, { useState, useEffect } from "react";
import axios from 'axios';
import sun from './images/sun.svg';
import cloud from './images/cloud.svg';
import windy from './images/windy.svg';
import rainy from './images/rainy.svg';
import snowy from './images/snowy.svg';

function App() {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const initialData = {
    city: {
      name: '',
      coord: {
        lat: '',
        lon: ''
      },
      sunrise: '',
      sunset: ''
    },
    list: []
  };
  const [data, setData] = useState({ initialData });
  const [location, setLocation] = useState();

  const API_KEY = '879c398ceb8850fd0ca703fa76141060';

  const fetchData = (location) => {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${API_KEY}&units=imperial`;
    axios.get(url)
      .then((response) => {
        if (response.data && response.data.list && response.data.list[0] && response.data.list[0].main) {
          setData(response.data);
          console.log(response.data);
        } else {
          console.error('Data structure is not as expected');
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };
  const tempChanger = (temp_f) => {
    const celsius = Math.round((temp_f - 32) * 5 / 9);
    return celsius;
  }
  const handleRefreshData = () => {
    window.location.reload();
  };
  const presDate = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    return `${dd} ${monthNames[mm - 1]} ${yyyy}`;
  };
  const getWeatherIcon = (weather) => {
    const weatherMain = weather?.toLowerCase();

    switch (weatherMain) {
      case 'clear':
        return sun;
      case 'clouds':
        return cloud;
      case 'rain':
        return rainy;
      case 'snow':
        return snowy;
      case 'wind':
        return windy;
      default:
        return 'default.svg';
    }
  };
  const convertUnixDatestamp = (unixTimestamp) => {
    const date = new Date(unixTimestamp * 1000);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formattedDate = `${day} ${monthNames[month - 1]} ${year}`;
    return formattedDate;
  }

  const convertUnixTimestamp = (unixTimestamp) => {
    const date = new Date(unixTimestamp * 1000);
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours %= 12;
    hours = hours || 12;

    const formattedTime = `${hours}:${minutes} ${ampm}`;
    return formattedTime;
  };

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      fetchData(location);
    }
  }

  useEffect(() => {
    fetchData(location);
  }, [location]);

  return (
    <div className="App">
      <div className="navbar">
        <div className="logo">
          <svg xmlns="http://www.w3.org/2000/svg" height="1.4em" viewBox="0 0 640 512"><path fill="white" d="M294.2 1.2c5.1 2.1 8.7 6.7 9.6 12.1l14.1 84.7 84.7 14.1c5.4 .9 10 4.5 12.1 9.6s1.5 10.9-1.6 15.4l-38.5 55c-2.2-.1-4.4-.2-6.7-.2c-23.3 0-45.1 6.2-64 17.1l0-1.1c0-53-43-96-96-96s-96 43-96 96s43 96 96 96c8.1 0 15.9-1 23.4-2.9c-36.6 18.1-63.3 53.1-69.8 94.9l-24.4 17c-4.5 3.2-10.3 3.8-15.4 1.6s-8.7-6.7-9.6-12.1L98.1 317.9 13.4 303.8c-5.4-.9-10-4.5-12.1-9.6s-1.5-10.9 1.6-15.4L52.5 208 2.9 137.2c-3.2-4.5-3.8-10.3-1.6-15.4s6.7-8.7 12.1-9.6L98.1 98.1l14.1-84.7c.9-5.4 4.5-10 9.6-12.1s10.9-1.5 15.4 1.6L208 52.5 278.8 2.9c4.5-3.2 10.3-3.8 15.4-1.6zM144 208a64 64 0 1 1 128 0 64 64 0 1 1 -128 0zM639.9 431.9c0 44.2-35.8 80-80 80H288c-53 0-96-43-96-96c0-47.6 34.6-87 80-94.6l0-1.3c0-53 43-96 96-96c34.9 0 65.4 18.6 82.2 46.4c13-9.1 28.8-14.4 45.8-14.4c44.2 0 80 35.8 80 80c0 5.9-.6 11.7-1.9 17.2c37.4 6.7 65.8 39.4 65.8 78.7z" /></svg>
          <p>Weather 99</p>
        </div>
        <div className="refresh">
          <button onClick={handleRefreshData}>
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path fill="white" d="M105.1 202.6c7.7-21.8 20.2-42.3 37.8-59.8c62.5-62.5 163.8-62.5 226.3 0L386.3 160H336c-17.7 0-32 14.3-32 32s14.3 32 32 32H463.5c0 0 0 0 0 0h.4c17.7 0 32-14.3 32-32V64c0-17.7-14.3-32-32-32s-32 14.3-32 32v51.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5zM39 289.3c-5 1.5-9.8 4.2-13.7 8.2c-4 4-6.7 8.8-8.1 14c-.3 1.2-.6 2.5-.8 3.8c-.3 1.7-.4 3.4-.4 5.1V448c0 17.7 14.3 32 32 32s32-14.3 32-32V396.9l17.6 17.5 0 0c87.5 87.4 229.3 87.4 316.7 0c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.5 62.5-163.8 62.5-226.3 0l-.1-.1L125.6 352H176c17.7 0 32-14.3 32-32s-14.3-32-32-32H48.4c-1.6 0-3.2 .1-4.8 .3s-3.1 .5-4.6 1z" /></svg>
            <p>Refresh</p>
          </button>
        </div>
      </div>
      <div className="data-container">
        <div className="loc-srh">
          {data.city && (
            <div className="loc">
              <div className="loc-name">
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512">
                  <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
                </svg>
                <h3>{data.city.name}</h3>
              </div>
              {data.city.coord && (
                <div className="loc-cor">
                  <p>{data.city.coord.lat},{data.city.coord.lon}</p>
                </div>
              )}
            </div>
          )}
          <div className="srh">
            <input
              type="search"
              name=""
              id=""
              placeholder="Search your city here..."
              value={location}
              onChange={(event) => setLocation(event.target.value)}
            />
            <button
              type="button"
              onClick={searchLocation}
            >
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
              </svg>
            </button>
          </div>

        </div>
        <hr />
        <div className="wea-info-container">
          <div className="details-row">
            <div className="pres-date">
              <p>Present Date</p>
              <div className="pd">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M7 11h2v2H7zm0 4h2v2H7zm4-4h2v2h-2zm0 4h2v2h-2zm4-4h2v2h-2zm0 4h2v2h-2z" /><path fill="currentColor" d="M5 22h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2zM19 8l.001 12H5V8h14z" /></svg>
                <p>{presDate()}</p>
              </div>
            </div>
            <div className="detail">
              <p>High Tempreature</p>
            </div>
            <div className="detail">
              <p>Low Tempreature</p>
            </div>
            <div className="detail">
              <p>Humidity</p>
            </div>
            <div className="detail">
              <p>Sunrise Time</p>
            </div>
            <div className="detail">
              <p>Sunset Time</p>
            </div>
          </div>
          <div className="cards-container">
            {data && data.list && data.list.length > 0 && (
              <div className="card-container">

                <div className="con-card">
                  <div className="date">
                    <p>{convertUnixDatestamp(data.list[0].dt)}</p>
                  </div>
                  <div className="card">
                    <div className="day-wea">
                      <img src={getWeatherIcon(data.list[0].weather[0].main)} alt={data.list[0].weather[0].main} />
                      <p>{data.list[0].weather[0].main}</p>
                    </div>
                    <div className="wea-detail">
                      <p>{tempChanger(data.list[0].main.temp_max)}°C/{Math.round(data.list[0].main.temp_max)}°F</p>
                    </div>
                    <div className="wea-detail">
                      <p>{tempChanger(data.list[0].main.temp_min)}°C/{Math.round(data.list[2].main.temp_min)}°F</p>
                    </div>
                    <div className="wea-detail">
                      <p>{data.list[0].main.humidity}%</p>
                    </div>
                    <div className="wea-detail">
                      <p>{convertUnixTimestamp(data.city.sunrise)}</p>
                    </div>
                    <div className="wea-detail">
                      <p>{convertUnixTimestamp(data.city.sunset)}</p>
                    </div>
                  </div>
                </div>


                <div className="con-card">
                  <div className="date">
                    <p>{convertUnixDatestamp(data.list[8].dt)}</p>
                  </div>
                  <div className="card">
                    <div className="day-wea">
                      <img src={getWeatherIcon(data.list[8].weather[0].main)} alt={data.list[8].weather[0].main} />
                      <p>{data.list[8].weather[0].main}</p>
                    </div>
                    <div className="wea-detail">
                      <p>{tempChanger(data.list[8].main.temp_max)}°C/{Math.round(data.list[8].main.temp_max)}°F</p>
                    </div>
                    <div className="wea-detail">
                      <p>{tempChanger(data.list[10].main.temp_min)}°C/{Math.round(data.list[10].main.temp_min)}°F</p>
                    </div>
                    <div className="wea-detail">
                      <p>{data.list[8].main.humidity}%</p>
                    </div>
                    <div className="wea-detail">
                      <p>{convertUnixTimestamp(data.city.sunrise)}</p>
                    </div>
                    <div className="wea-detail">
                      <p>{convertUnixTimestamp(data.city.sunset)}</p>
                    </div>
                  </div>
                </div>


                <div className="con-card">
                  <div className="date">
                    <p>{convertUnixDatestamp(data.list[11].dt)}</p>
                  </div>
                  <div className="card">
                    <div className="day-wea">
                      <img src={getWeatherIcon(data.list[11].weather[0].main)} alt={data.list[11].weather[0].main} />
                      <p>{data.list[11].weather[0].main}</p>
                    </div>
                    <div className="wea-detail">
                      <p>{tempChanger(data.list[11].main.temp_max)}°C/{Math.round(data.list[11].main.temp_max)}°F</p>
                    </div>
                    <div className="wea-detail">
                      <p>{tempChanger(data.list[13].main.temp_min)}°C/{Math.round(data.list[13].main.temp_min)}°F</p>
                    </div>
                    <div className="wea-detail">
                      <p>{data.list[11].main.humidity}%</p>
                    </div>
                    <div className="wea-detail">
                      <p>{convertUnixTimestamp(data.city.sunrise)}</p>
                    </div>
                    <div className="wea-detail">
                      <p>{convertUnixTimestamp(data.city.sunset)}</p>
                    </div>
                  </div>
                </div>

                <div className="con-card">
                  <div className="date">
                    <p>{convertUnixDatestamp(data.list[19].dt)}</p>
                  </div>
                  <div className="card">
                    <div className="day-wea">
                      <img src={getWeatherIcon(data.list[19].weather[0].main)} alt={data.list[19].weather[0].main} />
                      <p>{data.list[19].weather[0].main}</p>
                    </div>
                    <div className="wea-detail">
                      <p>{tempChanger(data.list[19].main.temp_max)}°C/{Math.round(data.list[19].main.temp_max)}°F</p>
                    </div>
                    <div className="wea-detail">
                      <p>{tempChanger(data.list[21].main.temp_min)}°C/{Math.round(data.list[21].main.temp_min)}°F</p>
                    </div>
                    <div className="wea-detail">
                      <p>{data.list[19].main.humidity}%</p>
                    </div>
                    <div className="wea-detail">
                      <p>{convertUnixTimestamp(data.city.sunrise)}</p>
                    </div>
                    <div className="wea-detail">
                      <p>{convertUnixTimestamp(data.city.sunset)}</p>
                    </div>
                  </div>
                </div>

                <div className="con-card">
                  <div className="date">
                    <p>{convertUnixDatestamp(data.list[27].dt)}</p>
                  </div>
                  <div className="card">
                    <div className="day-wea">
                      <img src={getWeatherIcon(data.list[27].weather[0].main)} alt={data.list[27].weather[0].main} />
                      <p>{data.list[26].weather[0].main}</p>
                    </div>
                    <div className="wea-detail">
                      <p>{tempChanger(data.list[27].main.temp_max)}°C/{Math.round(data.list[27].main.temp_max)}°F</p>
                    </div>
                    <div className="wea-detail">
                      <p>{tempChanger(data.list[29].main.temp_min)}°C/{Math.round(data.list[29].main.temp_min)}°F</p>
                    </div>
                    <div className="wea-detail">
                      <p>{data.list[27].main.humidity}%</p>
                    </div>
                    <div className="wea-detail">
                      <p>{convertUnixTimestamp(data.city.sunrise)}</p>
                    </div>
                    <div className="wea-detail">
                      <p>{convertUnixTimestamp(data.city.sunset)} </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

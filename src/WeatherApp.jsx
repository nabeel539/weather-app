import { useState, useEffect } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import humidity from "./images/humidity.png";
import wind from "./images/wind.png";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  

  const API_KEY = "9a0fd71580c331a164df129768294385"; // Replace with your API key
  const API_URL = `https://api.openweathermap.org/data/2.5/weather`;

  const fetchWeather = async () => {
    try {
      const response = await fetch(
        `${API_URL}?q=${city}&units=metric&appid=${API_KEY}`
      );

      const data = await response.json();
      setWeatherData(data);
        
    } catch (error) {
      console.error("Error fetching weather data:", error);
       
    }
  };

  useEffect(() => {
    const fetchDateTime = () => {
      const now = new Date();

      const formattedDate = now.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      setCurrentDate(formattedDate.replace(/(\d+)(st|nd|rd|th)/, "$1"));

      const formattedTime = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      setCurrentTime(formattedTime);
    };

    fetchDateTime();

    const interval = setInterval(fetchDateTime, 60000); // Update time every minute
    return () => clearInterval(interval);
  }, []);

  const getWeatherIcon = (iconCode) => {
    if (iconCode) {
      return (
        <img
          src={`https://openweathermap.org/img/wn/${iconCode}@2x.png`}
          alt="Weather Icon"
        />
      );
    }
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city) {
      fetchWeather();
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 p-4">
      <h1 className="text-3xl font-bold mb-8">Weather App</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 shadow-md"
        >
          Get Weather
        </button>
      </form>
      {weatherData && (
        <div className="flex flex-col gap-10 ">
          <div className="bg-white/30 bg-gradient-to-r from-pink-300/3 via-purple-300/3 to-indigo-400/3 border text-black  max-sm:w-[340px] max-2xl:w-[400px] w-[400px] rounded-3xl p-4 border-white/40 shadow-lg">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1 text-[18px] font-medium ">
                <div className="text-2xl">
                <FaLocationDot />
                </div>
                {weatherData.name}, {weatherData.sys.country}
              </div>
              <div className="text-[20px] font-medium">{currentTime}</div>
            </div>
            <div className="flex justify-between items-center">
              <div className="bg-white/30 border border-white backdrop-blur-lg  m-2 p-2 rounded-lg w-20 shadow-md">
                {getWeatherIcon(weatherData.weather[0].icon)}
              </div>
              <div>
                <div className="text-[20px] font-medium ">
                  {weatherData.main.temp} °C
                </div>
                <div className="text-[18px] font-medium capitalize">
                {weatherData.weather[0].description}  
                </div>
              </div>
            </div>
            <div className="flex gap-1 items-center font-medium text-[18px]">
              <div>
                <FaCalendarAlt />
              </div>
              {currentDate}
            </div>
          </div>
          <div className="bg-gradient-to-r from-pink-300/3 via-purple-300/3 to-indigo-400/3 border  text-black w-full rounded-3xl p-4 border-white/40  backdrop-blur-lg shadow-lg">
            <div className="flex  items-center">
              <div>
                <img
                  className="w-16  p-4 rounded-2xl m-3 bg-white/30 border border-white backdrop-blur-lg  shadow-md"
                  src={humidity}
                />
              </div>
              <div className="text-[18px] font-medium">
                <div>Humidity</div>
                <div>{weatherData.main.humidity} %</div>
              </div>
            </div>
            <div className="flex  items-center">
              <div>
                <img className="w-16 p-4 rounded-2xl m-3 bg-white/30 border border-white backdrop-blur-lg  shadow-md" src={wind} />
              </div>
              <div className="text-[18px] font-medium">
                <div>Wind Speed</div>
                <div>{weatherData.wind.speed} m/s</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;

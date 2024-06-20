import { Input } from "@nextui-org/react";
import axios from "axios";
import { Droplets, Search, Wind } from "lucide-react";
import { useEffect, useState } from "react";

const Display = () => {
  const [data, setData] = useState({
    celcius: "",
    name: "",
    humidity: "",
    speed: "",
    weatherImage: "",
  });

  const [name, setName] = useState("London");
  const [background, setBackground] = useState(""); // State for background image
  const [error, setError] = useState(null);

  const fetchData = async (city) => {
    if (city.trim() !== "") {
      try {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f160aa04218772186eb391cd58f5fd93&units=metric`;
        const response = await axios.get(apiUrl);
        const weatherCondition = response.data.weather[0].main; // Extract weather condition
        const weatherImage = getWeatherImage(weatherCondition); // Get custom image URL based on weather condition
        const weatherBackground = getWeatherBackground(weatherCondition); // Get custom background URL based on weather condition
        setData({
          celcius: response.data.main.temp,
          name: response.data.name,
          humidity: response.data.main.humidity,
          speed: response.data.wind.speed,
          weatherImage: weatherImage,
        });
        setBackground(weatherBackground); // Set background image
        setError(null); // Clear any previous errors
      } catch (error) {
        setError("City not found. Please try again."); // Set error message
        console.error("Error fetching weather data:", error);
      }
    }
  };

  // Function to get custom image URL based on weather condition
  const getWeatherImage = (weatherCondition) => {
    switch (weatherCondition) {
      case "Clear":
        return "/clear.png";
      case "Clouds":
        return "/cloudy.png";
      case "Rain":
        return "/rainy.png";
      case "Snow":
        return "/snow.png";
      case "Thunderstorm":
        return "/thunderstorm.png";
      case "Drizzle":
        return "/drizzle.png";
      case "Mist":
        return "/mist.png";
      case "Smoke":
        return "/smoke.png";
      case "Haze":
        return "/haze.png";
      case "Dust":
        return "/dust.png";
      case "Fog":
        return "/fog.png";
      case "Sand":
        return "/sand.png";
      case "Ash":
        return "/ash.png";
      case "Squall":
        return "/squall.png";
      case "Tornado":
        return "/tornado.png";
      default:
        return "/default.png";
    }
  };

  // Function to get custom background URL based on weather condition
  const getWeatherBackground = (weatherCondition) => {
    switch (weatherCondition) {
      case "Clear":
        return "/clear-bg.jpg";
      case "Haze":
        return "/haze-bg.jpg";

      default:
        return "/default-bg.jpg";
    }
  };

  useEffect(() => {
    fetchData(name); // Fetch data for London on initial render
  }, [setName]);

  const handleSearch = () => {
    fetchData(name); // Fetch data when user clicks search button
  };

  return (
    <>
      <div className="containers w-full h-screen flex justify-center items-center">
        <div className="absolute top-0 left-0 w-screen h-screen -z-10 bg-black/45"></div>
        <div
          className="absolute top-0 left-0 w-screen h-screen -z-20"
          style={{
            backgroundImage: `url(${background})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}></div>
        <div
          className="weather w-[380px] h-[480px] rounded-xl p-8 bg-black/20 backdrop-blur-md"
          style={{ boxShadow: "0 10px 30px rgba(0, 0, 0, 1)" }}>
          <div className="">
            <div className="search flex justify-between items-center gap-5">
              <Input
                type="text"
                placeholder="Enter City Name"
                radius="full"
                className="border-none outline-none rounded-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <div
                className="rounded-full border-none outline-none cursor-pointer bg-slate-50 p-3 hover:px-5 flex duration-300 easy justify-center items-center hover:bg-slate-300 "
                onClick={handleSearch}>
                <Search className="w-5 h-auto" />
              </div>
            </div>

            {error ? (
              <div className="text-white mt-10 text-center">
                <p>{error}</p>
              </div>
            ) : (
              <div>
                <div className="w-full flex justify-center items-center text-center text-white">
                  <div>
                    <img
                      src={data.weatherImage}
                      className="w-44"
                      alt="Weather icon"
                    />
                    <div className="text-5xl font-medium">
                      {Math.round(data.celcius)}°c
                    </div>
                    <div className="text-[28px] mt-5">{data.name}</div>
                  </div>
                </div>
                <div className="text-white mt-10">
                  <div className="flex justify-between items-center">
                    <div className="flex justify-center items-center gap-3">
                      <Droplets size={40} />
                      <div className="space-y-1">
                        <p className="text-[13px]">
                          {Math.round(data.humidity)}%
                        </p>
                        <p className="text-[13px]">Humidity</p>
                      </div>
                    </div>
                    <div className="flex justify-center items-center gap-3">
                      <Wind size={40} />
                      <div className="space-y-1">
                        <p className="text-[13px]">
                          {Math.round(data.speed)}km/h
                        </p>
                        <p className="text-[13px]">Wind</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Display;

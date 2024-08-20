import { useState } from "react";
import axios from "axios";

import clearimg from "./assets/clear.jpeg";
import cloudimg from "./assets/clouds.jpeg";
import mistimg from "./assets/mist.jpeg";
import rainimg from "./assets/rain.png";

function Weather() {
  const [city, setcity] = useState("");
  const [error, seterror] = useState("");
  const [weather, setweather] = useState("");
  const [temp, settemp] = useState("");
  const [desc, setdesc] = useState("");

  function handleCity(evt) {
    setcity(evt.target.value);
    seterror("");
  }

  function getWeather() {
    var weatherData = axios(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2964feb2e22822177130e8a28cda703a`
    );
    weatherData
      .then(function (success) {
        setweather(success.data.weather[0].main);
        setdesc(success.data.weather[0].description);
        settemp(success.data.main.temp);
        seterror("");
      })
      .catch((error) => {
        seterror("please check your location");
      });
  }

  function Images() {
    if (weather === "Clouds") {
      return <img src={cloudimg} alt="none1" className="img"></img>;
    } else if (weather === "Haze") {
      return <img src={mistimg} alt="none2"className="img"></img>;
    } else if (weather === "Rain") {
      return <img src={rainimg} alt="none3"className="img"></img>;
    } else {
      return <img src={clearimg} alt="none4"className="img"></img>;
    }
  }

  return (
    
      

      <div className="main">
      <div className="images">
        <Images/>
      </div>
        <div className="content">
          <h1 className="topic">weather report:</h1>
          <p className="topic2">I can give a weather report about your city</p>
          <fieldset>
            <legend>Weather:</legend>
            <input onChange={handleCity} type="text"></input>
          </fieldset>

          <button className="btn" onClick={getWeather}>get wather</button>
          <div>
            <p className="error">{error}</p>
            <p className="ans">weather:{weather}</p>
            <p className="ans">Temperature:{temp}</p>
            <p className="ans">Description :{desc}</p>
          </div>
        </div>
      </div>
    
  );
}

export default Weather;

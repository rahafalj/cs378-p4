import './App.css';
import WeatherInfo from './Components/WeatherInfo';
import React, {useState, useEffect} from 'react'


function App() {
  const [timeAndTemp, setTimeAndTemp] = useState([])
  const [clickedCity, setClickedCity] = useState([])
  async function addCity(lat, long, city) {
    const apiurl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m`
    try {
      const response = await fetch(apiurl)
      const json = await response.json()
      const parsedTimeAndTemp = {
        city: city,
        times: json["hourly"]["time"],
        temps: json["hourly"]["temperature_2m"]
      }
      setTimeAndTemp([...timeAndTemp, parsedTimeAndTemp])
    } catch (err) {
      console.log(err)
      alert(`Could not find weather for ${city}`)
    }
  }
  useEffect(() => {
    if (timeAndTemp.length === 0) {
      addCity(30.26715, -97.74306, "Austin")
    } else if (timeAndTemp.length === 1) {
      addCity(32.78306, -96.80667, "Dallas")
    } else if (timeAndTemp.length === 2) {
      addCity(29.76328, -95.36327, "Houston")
    }
  })

  return (
    <div className="App">
      {timeAndTemp.map((props) => (
        <button onClick={() => {setClickedCity(props)}}>{props.city}</button>
      ))}
      <input type="text" name="city" placeholder="city" id="city"></input>
      <input type="number" name="latitude" placeholder="latitude" id="lat"></input>
      <input type="number" name="longitude" placeholder="longitude" id="long"></input>
      <button onClick={() => {
        addCity(document.getElementById("lat").value, document.getElementById("long").value, document.getElementById("city").value)
        }}>Add</button>
      <WeatherInfo clickedCity={clickedCity}/>
    </div>
  );
}

export default App;

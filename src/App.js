// import HotBg from './assets/hot.jpg'


import { useEffect, useState } from 'react';
import SnowBg from './assets/snow.jpg'
import Descriptions from './components/Descriptions';
import { getFormattedWeatherData } from './weatherService';
import Sunnybg from './assets/sun.jpg'




function App() {
  const [city,setCity]=useState("Himachal Pradesh")
  const [weather,setWeather] = useState(null)
  const [units, setUnits] = useState("metric")
  const [bg, setBg] = useState(SnowBg)
  useEffect(()=>{
    const fetchWeatherData = async()=>{
      const data = await getFormattedWeatherData(city, units)
      setWeather(data)
      

      const threshold = units ==='metric'? 20:60;
      if (data.cel<= threshold) setBg(SnowBg)
      else setBg(Sunnybg) 
      

    };
    fetchWeatherData()
   
  },[units,city]);
  // const handleUnitsClick=(e)=>{
  //   const button = e.currentTarget;
  //   const currentUnit = button.innerText.slice(1);
  //   const isCelcius = currentUnit ==='C';
  //   button.innerText = isCelcius? '°F':'°C';
  //   setUnits(isCelcius ? "metric":"imperial")

  // }
  const enterKeyPressed =(e)=>{
    if (e.keyCode ===13){
      setCity(e.currentTarget.value)
      e.currentTarget.blur();
    }

  }
  return (
    <div className="App" style={{backgroundImage:`url(${bg})`}}>
    <div className="overlay">
    
      {
        
        weather && (
          
          <div className="container">
          <div className="section section__inputs">
            <input onKeyDownCapture={enterKeyPressed} type="text" placeholder='Enter City...' name='city' />
            
          </div>
         <div className="section section__temperature">
            <div className="icon">
              <h3>{weather.name},{weather.country}</h3>
              <img src={weather.iconURL} alt="weatherIcon" />
              <h3>{weather.description}</h3> 
            </div>
            <div className='temperature'>
              <h1>{weather.cel.toFixed()}°C</h1>
            </div>
          </div>
          <Descriptions weather = {weather} units={units}/>
        </div>
          
        )
      }
     
    </div>
    </div>
  );
}

export default App;

const API_KEY = "55fd60bb8b8817a0c887f4fac7ec2372";

const makeIconURL = (iconID) =>
  `https://openweathermap.org/img/wn/${iconID}@2x.png`;
  
const getFormattedWeatherData = async (city, units ) => {
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}}`;
  const data = await fetch(URL)
    .then((res) => res.json())
    .then((data) => data);


  

  const {
    weather,
    main: { temp, feels_like, temp_max, temp_min, pressure, humidity },
    wind: { speed },
    sys: { country },
    name,
  } = data;
  console.log(data);
  const { description, icon } = weather[0];
  


  const kelvinToCel=(kelvin)=>{
    return kelvin -273.15;

  }
   const tempinKelvin = temp
   const mininKelvin=temp_min
   const maxinKelvin=temp_max
   const feelinKelvin = feels_like
   const cel = kelvinToCel(tempinKelvin);
   const mincel = kelvinToCel(mininKelvin)
   const maxcel = kelvinToCel(maxinKelvin)

   const feelcel = kelvinToCel(feelinKelvin)

   

  //  console.log(cel  )


  return {
    description,
    iconURL: makeIconURL(icon),
    cel,
    weather,
    feelcel,
    maxcel,
    mincel,
    pressure,
    humidity,
    
    speed,
    country,
    name,
   
  };
};
export { getFormattedWeatherData };

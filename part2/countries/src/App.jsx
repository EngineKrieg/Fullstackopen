import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
const apiKey = import.meta.env.VITE_WEATHER_KEY;


const CountryInfo = ({filterCountries}) => {
  let lat = filterCountries[0].latlng[0];
  let lon = filterCountries[0].latlng[1];
  const [iconTempWind, setIconTempWind] = useState([]);
  const languagesArr = [];
  for (let keyLanguage in filterCountries[0].languages){
    if(filterCountries[0].languages.hasOwnProperty(keyLanguage)){
      languagesArr.push(filterCountries[0].languages[keyLanguage])
    }
  }

  useEffect(()=>{

    axios
    .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
    .then(response => {
      setIconTempWind([response.data.weather[0].icon,response.data.main.temp,response.data.wind.speed])
      console.log(response);
    })
  },[])
  

  return (
      <>
        <h1>{filterCountries[0].name.common}</h1>
        <p>capital {filterCountries[0].capital[0]}</p>
        <p>area {filterCountries[0].area}</p>
        <h3>Languages:</h3>
        <ul>
          {languagesArr.map(lang=><li key={lang}>{lang}</li>)}
        </ul>
        <img className="flag" src={filterCountries[0].flags.svg}/>
        <h1>Weather in {filterCountries[0].capital[0]}</h1>
        <p>temperature {iconTempWind[1]} °C</p>
        <img src={`https://openweathermap.org/img/wn/${iconTempWind[0]}@2x.png`}/>
        <p>wind {iconTempWind[2]} m/s</p>
      </>
    ) 
}



const ShowCountryList = ({filterCountries, handleShowClick}) => {

  if(filterCountries.length >= 10){
    return (
      <p>Too many matches, be specific</p>
    )
  }
  else if(filterCountries.length === 1){
    return <><CountryInfo filterCountries={filterCountries}/></>
  }

  return (
    <div>
      {filterCountries.map(country => <p key={country.name.common}>{country.name.common} <button onClick={()=>handleShowClick(country)}>show</button></p>)}
    </div>
  )

}


function App() {
  const [value, setValue] = useState('');
  const [countries, setCountries] = useState(null);
  const [filterCountries, setFilterCountries] = useState([]);


  useEffect(()=>{

    axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
        console.log(response.data);
        setCountries(response.data);
      })
  },[])



  const handleChange = (e) => {
    setValue(e.target.value);
    let regex = new RegExp(e.target.value,"i");
    setFilterCountries(countries.filter(country => regex.test(country.name.common)))

  }

  const handleShowClick = (country) =>{
    setFilterCountries([country]);
  }


  return (
    <>
      find countries <input onChange={handleChange} value={value}/>
      <ShowCountryList filterCountries={filterCountries} handleShowClick={handleShowClick}/>
    </>
  )
}

export default App

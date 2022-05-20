// https://api.openweathermap.org/data/2.5/weather?q=delhi&appid=da4989f66a2cefaaa0dc5eb3773d3836

import React, {useState, useEffect} from 'react'
import "./style.css";
import Weathercard from './weathercard.js';

const Temp = () => {
    const [searhValue, setSearchValue] = useState("delhi");
    const [tempInfo, setTempInfo] = useState({});
    const getWeatherInfo = async () => {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${searhValue}&units=metric&appid=da4989f66a2cefaaa0dc5eb3773d3836`
        
            let res = await fetch(url);
            let data = await res.json();
            
            const { temp, humidity, pressure } = data.main;
            const {main: weathermood} = data.weather[0]; 
            const { name } = data;
            const { speed } = data.wind;
            const { country, sunset } = data.sys;

            //Pass the data
            const myNewWeatherInfo = {
                temp, humidity, pressure, weathermood, name, speed, country, sunset
            };

            setTempInfo(myNewWeatherInfo);

        } catch (error) {
          console.log(error); 
        }
    };

    useEffect(() => {
        getWeatherInfo();
    }, [])
    
  return (
    <>  
        <div className="wrap">
            <div className="search">
                <input type="search" placeholder="search..." autoFocus id="search" className="searchTerm" value={searhValue} onChange={(e)=> setSearchValue(e.target.value)}/>
                <button className="searchButton" type="button" onClick={getWeatherInfo}>Search</button>
            </div>
        </div>

        {/* our temperature card */}
        <Weathercard {...tempInfo}/>
    </>
  )
}

export default Temp;

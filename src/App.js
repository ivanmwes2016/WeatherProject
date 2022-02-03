import React, { Component } from 'react';
import './App.css';
import Weather from './app_component/weather.component';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'weather-icons/css/weather-icons.css';
import Form from './app_component/form.component';

/** importing the API, Based on: https://openweathermap.org/current  */

const API_key = "ce2f3b60a12b376f9013c31c56225ca7"
{/** SETTING THE CONSTRUCTOR */}
class App extends React.Component{
  constructor(){
    super();
    this.state = {
      city: undefined,
      country: undefined,
      icon:undefined,
      main:undefined,
      celsius:undefined,
      temp_max:undefined,
      temp_min:undefined,
      description: "",
      feeling: undefined,
      error: true
  };
 

    this.weather_icon ={
      Thunderstorm:"wi-thunderstorm",
      Drizzle:"wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere:"wi-fog",
      Clear:"wi-day-sunny",
      Clouds: "wi-day-fog"
    }

  }

  /** TO CONVERT TEMP TO DEGREES */
  calCelcius(temp){
    let cell = Math.floor(temp - 273.15); /** To Convert to integer */
    return cell;
  }

  /** Method To change weather icon to a specific icon */
  /** Based on https://openweathermap.org/weather-conditions  */

  getWeatherIcon(icons, rangeID){
    switch (true){
      case rangeID >= 200 && rangeID <= 232:
        this.setState({icon:this.weather_icon.Thunderstorm})
        break;
      case rangeID >= 300 && rangeID <= 321:
        this.setState({icon:this.weather_icon.Drizzle})
        break;
      
      case rangeID >= 500 && rangeID <= 521:
        this.setState({icon:this.weather_icon.Rain})
        break;

      case rangeID >= 600 && rangeID <= 622:
        this.setState({icon:this.weather_icon.Snow})
        break;
      
      case rangeID >= 701 && rangeID <= 781:
        this.setState({icon:this.weather_icon.Atmosphere})
        break;
      
      case rangeID == 800:
        this.setState({icon:this.weather_icon.Clear})
        break;
      
      case rangeID >= 801 && rangeID <= 804:
        this.setState({icon:this.weather_icon.Clouds})
        break;
      }

  }

  getWeather = async(e)=>{
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    
    if(city&&country){

      const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_key}`);

      const response = await api_call.json();{/** converts the data in Json format */}
      console.log(response);
  
      this.setState({
        city:`${response.name}, ${response.sys.country}`,
        country:response.sys.country,
        celsius:this.calCelcius(response.main.temp),
        temp_max: this.calCelcius(response.main.temp_max),
        temp_min: this.calCelcius(response.main.temp_min),
        description:response.weather[0].description,
        feeling:this.calCelcius(response.main.feels_like),
        icon:this.weather_icon.Thunderstorm,
        icon:this.weather_icon.Rain,
        icon:this.weather_icon.Drizzle,
        icon:this.weather_icon.Snow,
        icon:this.weather_icon.Clear,
        icon:this.weather_icon.Atmosphere,
        icon:this.weather_icon.Clouds
       
  
      });

      this.getWeatherIcon(this.weather_icon,response.weather[0].id);

    }else{
      this.setState({error:true});
    }


  
  };


  
  render(){
    return(
      <div className="App">
      <Form loadweather ={this.getWeather}></Form>
      <Weather 
      city ={this.state.city} 
      country={this.state.country} 
      temp_celsius={this.state.celsius}
      temp_max = {this.state.temp_max}
      temp_min = {this.state.temp_min}
      description={this.state.description}
      feeling = {this.state.feeling}
      weather_icon = {this.state.icon}
      />
       </div>
    );
  }
}



export default App;

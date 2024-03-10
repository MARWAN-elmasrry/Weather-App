// Tutorial by http://youtube.com/CodeExplained
// api key : 82005d27a116c2880c8f0fcb866998a0

// SELECT ELEMENTS  FROM HTML PAGE
const iconElemnet=document.querySelector(".weather-icon");
const tempElemnet=document.querySelector(".temperature-value p");
const descElemnet=document.querySelector(".temperature-description p");
const locationElemnet=document.querySelector(".location p");
const notificationElemnet=document.querySelector(".notification");

//  App Data
const weather={};

weather.teperature={
    unit:"celsius"
}

// APP Consts And Vars
const KELVIN=273;
// API KEY
const key="82005d27a116c2880c8f0fcb866998a0";

// Check if  the user's browser support geolocation 
if("geolocation" in navigator){
     navigator.geolocation.getCurrentPosition(setPosition,showError);
 }else{
    notificationElemnet.style.display="block";
    notificationElemnet.innerHTML= "<p> Geolocation is not supported by your Browser.</p>";
}

function setPosition(position){
    let latitude=position.coords.latitude;
    let longitude=position.coords.longitude;

    getWeather(latitude,longitude)
}

function  showError(error){
    notificationElemnet.style.display="block";
    notificationElemnet.innerHTML= `<p>${error.message}</p>` ;
}

// GET  WEATHER From Api 
function getWeather(latitude , longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

    fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            weather.teperature.value=Math.floor(data.main.temp - KELVIN);
            weather.description=data.weather[0].description;
            weather.iconId=data.weather[0].icon;
            weather.city=data.name;
            weather.country=data.sys.country;
        })
        .then(function(){
            displayWeather();
        });
    }
function displayWeather(){
    iconElemnet.innerHTML=`<img src="icons/${weather.iconId}.png" />`;
    tempElemnet.innerHTML=`${weather.teperature.value}*<span>C</span>`;
    descElemnet.innerHTML=weather.description;
    locationElemnet.innerHTML=`${weather.city}, ${weather.country}`;  
}

function  celsiusToFahrenheit(teperature){
    return (teperature * 9 / 5 ) + 32;
}

tempElemnet.addEventListener("click", function(){
    if(weather.teperature.value === undefined) return;

    if(weather.teperature.unit=="celsius"){
        let  fahrenheit = celsiusToFahrenheit(weather.teperature.value);
        fahrenheit= Math.floor(fahrenheit);

        tempElemnet.innerHTML=`${fahrenheit}*<span>F</span>`;
        weather.teperature.unit ="fahrenheit";
    }else{
        tempElemnet.innerHTML=`${weather.teperature.value}*<span>C</span>`;
        weather.teperature.unit = "celsius";
    }

});
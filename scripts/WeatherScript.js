// {Name: Weather}
// {Description: Gives information about weather conditions in different locations.}

const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY //Individual API key
let weatherData
let appWeatherData

//Get the weather of a particular location
intent('What is the weather (for|like|) (in|) $(LOC)', p => {
        
       let WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather?q="+ p.LOC + "&units=metric&appid=" + WEATHER_API_KEY
       console.log(WEATHER_API_URL)
        
       api.axios.get(WEATHER_API_URL).
       then((response) => {
           weatherData = response.data
           
           // Destructuring the data before it is sent to the application
           let { name } = weatherData;
           let { icon, description } = weatherData.weather[0];
           let { temp, humidity } = weatherData.main;
           let { speed } = weatherData.wind;
           icon = 'http://openweathermap.org/img/wn/'+icon+'@2x.png'
           appWeatherData = {name, icon, description, temp, humidity, speed}
           
           p.play({command: 'updateWeather', newWeatherData: appWeatherData})
           p.play(`Here is the weather of ${p.LOC}`)
           p.play('Would you like me to read the weather updates?')
           p.then(readWeather)
       })
    })

const readWeather = context(() => {
    intent('(yes|yeah|sure)', (p) => {
    //Read the data present eg: wind speed, humidity temperature and etc ...
        p.play(`It is ${appWeatherData.temp}°C`)
        p.play(`The condition is ${appWeatherData.description}`)
        p.play(`The humidity is at ${appWeatherData.humidity}%`)
        p.play(` And the wind speed is ${appWeatherData.speed} km/h`)
        p.resolve()  
    })
    
    intent('no', (p) => {
        p.play('(Okay|Alright|Sure), (wonderful|sounds good to me).')
        p.resolve()
    })
})



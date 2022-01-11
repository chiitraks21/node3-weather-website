const request = require('request')

const forecast = (latitude , longitude , callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=f6d594219c757608f95a5f5fe42e24d6&query=' + latitude + ',' + longitude  
    
    request({ url , json : true}, (error , {body}) => {
        if(error){
            callback('Unable to connect to weather service !' , undefined)
        } else if(body.error) {
            callback('Unable to find location' , undefined) 
        } else {
            callback(undefined ,body.current.weather_descriptions[0] + 
            '.\n' + 'It is currently ' + body.current.temperature + ' degree Celcius and/but feels like ' + body.current.feelslike + ' degree Celcius' + 
            '.\nThe humidity is ' + body.current.humidity + '%. This data was observed at ' + body.current.observation_time )
        }
    })
}

module.exports = forecast
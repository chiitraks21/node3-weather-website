const request = require('request')

const forecast = (latitude , longitude , callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=f6d594219c757608f95a5f5fe42e24d6&query=' + latitude + ',' + longitude  
    
    request({ url , json : true}, (error , {body}) => {
        if(error){
            callback('Unable to connect to weather service !' , undefined)
        } else if(body.error) {
            callback('Unable to find location' , undefined) 
        } else {
            callback(undefined , 'it is currently ' + body.current.temperature + ' but feels like ' + body.current.feelslike)
        }
    })
}

module.exports = forecast
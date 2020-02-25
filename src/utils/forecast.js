const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = 'https://api.darksky.net/forecast/019cf7553eaca51fcfcc50514287db6c/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '?units=si'

    request({url, json: true}, (error, response) => {
        if(error){
            callback('Unable to connect to the weather service!', undefined)
        }else if(response.body.error){
            callback('Unable to find location!', undefined)
        }else{
            callback(undefined, {

                latitude: response.body.latitude,
                longitude: response.body.longitude,
                summary: response.body.daily.data[0].summary,
                current_temp: response.body.currently.temperature,
                chance_rain: response.body.currently.precipProbability
            })
        }
    })
}

module.exports = forecast
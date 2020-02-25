const request = require('request')

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicG9kZ3VseWF2c2h5eSIsImEiOiJjazZyOGVyeTkwM2V0M2xwZnh3cjVzbXZyIn0.I7lVQHlSCrAWmd_utU99Fw&limit=1'

    request({url, json:true}, (error, response) => {
        if(error) {
            callback('Unable to connect to location services!', undefined)
        }else if(response.body.features.length === 0){
            callback('Unable to find location, please try another search!', undefined)
        }else{
            callback(undefined, {
                //data
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode
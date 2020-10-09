const rp = require('request-promise');

// Making weather API call request
const weatherFunction = (latitude, longitude, callback) => {
    //Weather API URL
    const queryURLWeather = "http://api.weatherstack.com/current?access_key=c0dc7a57030a74b67d8ad3cd3f145795&query=" + latitude + ',' + longitude + "&units=f";

    rp({ url: queryURLWeather, json: true }, (error, response) => {

        //Error handling
        if (error) {
            callback('Error: Unable to connect to weather service.', undefined);
        } else if (response.body.error) {
            callback('Unable to find location.', undefined);
        } else {
            //Define variables
            const {
                temperature,
                weather_icons: icons,
                weather_descriptions: descriptions,
                precip: precipitation,
                uv_index: uvIndex
            } = response.body.current;

            callback(undefined,
                descriptions + ': The current temperature is ' + temperature + ' degrees F.' + ' The current precipitation is ' + precipitation + ', with a UV index of ' + uvIndex + '.'
            );
        }
    })
}


module.exports = weatherFunction;
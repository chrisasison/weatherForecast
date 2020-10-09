const rp = require('request-promise');

//Geocoding api request

const geocodeFunction = (location, callback) => {
    //Geocoding URL information
    const accessToken = "access_token=pk.eyJ1IjoiY2hyaXNhc2lzb24iLCJhIjoiY2tmdm9wMTVyMGQydTJ0b2t2aGJ4bTl3YyJ9.D-EcT0M8p0LEBqriO4mwxA";

    const queryURLGeocoding = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(location) + ".json?" + accessToken + "&limit=1";
    

    rp({ url: queryURLGeocoding, json: true }, (error, response) => {
        if (error) {
            callback('Error: Unable to connect to find location services.', undefined);
        } else if (response.body.features.length === 0) {
            callback('Unable to find location. Try another search.')
        } else {
            //Define variables
            const location = response.body.features[0].place_name;
            const longitude = response.body.features[0].center[0];
            const latitude = response.body.features[0].center[1];

            callback(undefined, {
                //Data that we will be sharing
                location,
                latitude,
                longitude
            })
        }
});
}


//Export geocode
module.exports = geocodeFunction;
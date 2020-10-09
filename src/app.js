//core modules
const path = require('path');
//external modules
const express = require('express');
const hbs = require('hbs');
const { response } = require('express');
const geocodeFunction = require('./geocode');
const weatherFunction = require('./weather');

//variable for express
const app = express();

//establish variable for different paths
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')


//npm extension hbs
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//static directory to server
app.use(express.static(publicDirectoryPath));


app.get('', (req, res) => {
    res.render('index', {

    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }

    geocodeFunction(req.query.address, (error, data) => {
        if (error) {
            return res.send({ error })
        }

        weatherFunction(data.latitude, data.longitude, (error, weatherData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                location: data.location,
                forecast: weatherData,
                address: req.query.address

            })
        })
    })

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        error: 'Error'
    })
})


//listens for port
app.listen(3000, () => {
    console.log('Server is Live on port 3000')
})
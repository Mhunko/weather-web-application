const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//console.log(path.join(__dirname, '../public'))
//console.log(__filename)

const app = express()

const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Maksym Hunko'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Maksym Hunko'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Testing help page',
        title: 'Help',
        name: 'Maksym Hunko'
    })
})

            //request and response
app.get('/weather', (req, res) => {
    if (!req.query.address){
        //using return just to stop the get function and not to run two 'send' functions
        return res.send({
            error: 'You have to provide an address'
        })
    }
    console.log(req.query)

    geocode(req.query.address, (error, { latitude, longitude, location} = {}) => {
        if (error){
            return res.send({error}) //if there is an error this if will return it and will not let further code to run
        }
        forecast(longitude, latitude, (error, forecastdata) => {
            if (error){
                return console.log(error)
            }
            //console.log(location)
            //forecastdata
            res.send({
                forecast: forecastdata,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Maksym Hunko',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        name: 'Maksym Hunko',
        errorMessage: 'This page does not exist'
    })
})


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
const express = require('express')
const path = require('path')
const app = express()
const hbs = require('hbs')
const port = process.env.PORT || 3000

//load in geocode and forecast to combine weather-app & web-server
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// Define paths for express config
const publicDirectoryPath = path.join(__dirname , '../public')
const viewsPath = path.join(__dirname , '../templates/views')
const partialsPath = path.join( __dirname , '../templates/partials')
// console.log(__dirname)
// console.log(path.join(__dirname + '../public'))

///// Setup handlebars engine and views location
app.set('view engine' , 'hbs')
// allows you to seta a value for a given express setting
app.set('views' , viewsPath)
// views folder name changed to 'templates' stored in viewsPath 
// variable , so here i've set the views(which the system will
// be looking for) to viewsPath , pointing to correct location

hbs.registerPartials(partialsPath)

///// Setup static directory to serve
app.use(express.static(publicDirectoryPath)) // stuff loads from a static directory --> html file
// we haveour static directory where we can put all the assets
// for our website

app.get('' , (req , res) => {
    res.render('index' , {
        title: 'Weather App',
        name: 'Chiitrak'
    })
})

app.get('/about' , (req , res) => {
    res.render('about'  , {
        title : 'About me',
        name : 'Chitti'
    })
})

app.get('/help' , (req , res) => {
    res.render('help'  , {
        helpText : 'BABUSHKA',
        title: 'Help',
        name: 'Chiitrak'
    })
})

app.get('/weather' , (req , res) => {
    if(!req.query.address){
        return res.send({
            error : 'You must provide an address !'
        })
    }

    geocode(req.query.address , (error , { latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({ error : error }) //shorthand 'error'
        }

        forecast(latitude , longitude , (error , forecastData) => {
            if(error) {
                return res.send({ error })
            }
            res.send({
                forecast : forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products' , (req , res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products : []
    })
})

app.get('/help/*' , (req ,res) => {
    res.render('404' , {
        title: '404',
        name: 'Chiitrak',
        errorMessage : 'Help article not found.'
    })
})

app.get('*' , (req ,res) => {
    res.render('404' , {
        title: '404',
        name: 'Chiitrak',
        errorMessage : 'Page not found'
    })
})

// app.com
// app.com/help
// app.com/about

app.listen(port , () => {
    console.log('Server is up on port ' + port)
})





// HBS : handlebars
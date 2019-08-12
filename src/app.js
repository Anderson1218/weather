const path = require('path');
const express = require('express');
const app = express();
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');


//define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {  
    res.render('index',{
        title: 'Welcome to Web',
        name: 'Anderson'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Anderson'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'help',
        name: 'Anderson'
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Anderson',
        error: 'help article not found'
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        //prevent from sending response to client twice
        return res.send({
            error: 'you must provide address'
        });
    }
    //use ES6 default parameters to handle the case that second argument is not an object
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error
            });
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                });
            }
            res.send({
                forecast: forecastData,
                location
            });
        })
    })
});

app.get('/products', (req, res) => {
    if(!req.query.search) {
        //prevent from sending response to client twice
        return res.send({
            error: 'you must ....'
        });
    }
    res.send({
        products: []
    });
});

app.get('*',(req, res) => {
    res.render('404', {
        title: '404',
        name: 'Anderson',
        error: 'page not found'
    });
});

app.listen(3000, () => {
    console.log('start listen');
});
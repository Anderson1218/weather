const path = require('path');
const express = require('express');
const app = express();
const hbs = require('hbs');


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
        title: 'hello world',
        name: 'Anderson'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about',
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
const path = require('path');
const express = require('express');
const app = express();

//app.com
//app.com/help
//app.com/about

//must be absolute path
// console.log(__dirname);
// console.log(path.join(__dirname, '../public'));

//from root /
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, '../public')));

app.get('', (req, res) => {
    res.render('index',{
        title: 'hello',
        name: 'Anderson'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {

    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        
    });
});

app.listen(3000, () => {
    console.log('start listen');
});
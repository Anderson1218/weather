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
    res.render('index');
});

app.get('', (req, res) => {
    res.send('<h2>hellooooo!</h2>');
});


app.listen(3000, () => {
    console.log('start listen');
});
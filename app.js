var express = require('express');
var app = express();
var birds = require('./birds');

var users = require('./users');
var jwt = require('jsonwebtoken');
var jwtSecret = '123';

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static(__dirname + '/public'));
app.use('/birds', birds);

app.get('/', function (req, res) {
    res.render('view', {
        name: 'yooon'
    });
});

app.listen(3000, function () {
    console.log('start dev server');
});
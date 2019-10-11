var express = require('express');
// var bodyParser = require('body-parser')
var app = express();

global.appRoot = __dirname;

var auth = require('./routes/auth');

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static(__dirname + '/public'));
app.use(express.json());

app.use('/auth', auth);
app.get('/', function (req, res) {
    res.render('index', { name: 'yooon' });
});

app.listen(3000, function () {
    console.log('start dev server');
});
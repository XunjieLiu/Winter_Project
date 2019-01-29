var http= require('http');
var express= require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
const app= express();
const port=4040;
var connection = require('./config_DB');
var id = 1; // To initialize id

app.set('view engine', 'pug');
app.set('views','./views');
app.set('','./JS_files');

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//form-urlencoded

// for parsing multipart/form-data
app.use(upload.array());

app.get('/', function(req, res){
   res.send('This is the homepage');
});

app.use('/', require('./user'))

app.use(express.static('public'));
app.listen(port,()=>console.log('<SeRveR iS RuNNinG>'));

/*
app.get('/', (request,response) => response.send('hi!'));
app.get('/homepage', function(req, res){
   res.render('homepage',{user: {name: "Sam", age: "19"}});
});
app.get('/login', (request,response) => response.send('So you wanna login?'));
app.get('/:id[0-9]{2}', function(req, res){
  res.send('This is your ID: '+req.params.id);
})

//in case none of the above is found
app.get('*', function(req, res){
   res.send('Sorry, this is an invalid URL.');
});
*/

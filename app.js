var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();
var mysql = require('mysql');
var router = express.Router();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

var connection = mysql.createConnection({
  host     : "rds-philly-guide.cww85eefiukb.us-east-1.rds.amazonaws.com",
  user     : "guest",
  password : "cis450guest",
  port     : "3306",
  database:  "phillyguide"
});

//connection.connect();

app.get('/ll', function(req, res) {
	console.log("before");
    res.send('table: ' + req.query['all']);

});

// app.get('/a', function(req, res){

// 	var table = req.query['all'];

// 	function fetchID(data, callback) {
//         connection.query('SELECT * from ' + table, function(err, rows) {
//             if (err) {
//                 callback(err, null);
//             } else 
//                 callback(null, rows);
//         });
// 	}

// });

// app.get('/al', function(req, res){

// 	var table = req.query['all'];
	
// 	console.log(table);
	
// 	connection.query('SELECT * from ' + table, function(err, rows, fields) {
// 	    if(err) console.log(err);
	    
// 	    console.log('The solution is: ', rows);
// 	    connection.end();
// 	});	
// });

// app.get('/',function(req,res){
//     var table = req.query['table'];
//     console.log(table);
//     connection.query('SELECT * from ' + table, function(err, rows, fields) {
//         if(err) {
//           console.log(err);
//           res.send(500);
//         }    
//         console.log('The solution is: ', JSON.parse(JSON.stringify(rows)));
        
//         res.send(rows);
//     }); 
// });





// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

var express = require('express');
var router = express.Router();

/* Initilize MongoDB connection*/

var mongoose = require('mongoose');
var mysql = require('mysql');

var mongoDB = 'mongodb://127.0.0.1/philly-guide';
mongoose.connect(mongoDB, {
  useMongoClient: true
});
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;


db.on('error', console.error.bind(console, 'connection error:'));

var walkscoreSchema = new mongoose.Schema({
_id: mongoose.Schema.Types.ObjectId,
description: String,
walkscore: Number,
neighborhood_id: Number, 
latitude: Number, 
longitude: Number 
});

var scoreOutput = mongoose.model("scoreOutput", walkscoreSchema);

var connection = mysql.createConnection({
  host     : "rds-philly-guide.cww85eefiukb.us-east-1.rds.amazonaws.com",
  user     : "guest",
  password : "cis450guest",
  port     : "3306",
  database:  "phillyguide"
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Philly Guide' });
});

/* GET education stats. */
router.get('/:education', function(req, res) {
	var query = '';
	var education = req.params.education;
	if (education != 'undefined') query = query + ' where schools.';
	console.log(query);
	connection.query(query, function(err, rows, fields) {
		 if (err) console.log(err);
    	 else {
        	res.json(rows);
    	}  
	});
});

module.exports = router;

/* GET walk score. */
// router.get('/walkscore', function(req, res) {
// 	scoreOutput.find({}, function(err, result){
// 		if (err) {
// 			console.log(err);
// 			res.send(500);
// 		}
// 		console.log('The solution is :');
// 	});
// 	res.send(result);
// });

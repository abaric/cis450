var express = require('express');
var router = express.Router();

var mysql = require('mysql');

var connection = mysql.createConnection({
	host     : "rds-philly-guide.cww85eefiukb.us-east-1.rds.amazonaws.com",
	user     : "guest",
	password : "cis450guest",
	port     : "3306",
	database:  "phillyguide"
});

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Philly Guide'});
});

/* GET home page. */
router.get('/all', function(req, res, next) {
	var table = req.query['table'];
	console.log(table);
	connection.query('SELECT * from ' + table, function(err, rows, fields) {
		if(err) {
			console.log(err);
			res.send(500);
		}    
		console.log('The solution is: ', JSON.parse(JSON.stringify(rows)));
		res.json(JSON.parse(JSON.stringify(rows)));
	});  
});
	

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

//"SELECT n.name, AVG(s." + field + ") as category FROM neighborhoods n, located_in l, schools s WHERE n.id = l.neighborhood_id AND s.id = l.school_id GROUP by n.id ORDER BY category DESC LIMIT " + num_rows


router.get('/education', function(req, res, next) {
	var field = req.query['option'];
	var num_rows = req.query['education_num'];
	var m = req.query['metric'];

	connection.query("SELECT n.name, AVG(s." + field + ") as category FROM neighborhoods n, located_in l, schools s WHERE n.id = l.neighborhood_id AND s.id = l.school_id GROUP by n.id ORDER BY category " + m + " LIMIT " + num_rows, function(err, rows, fields) {
		if(err) {
			console.log(err);
			res.send(500);
		}    
		console.log('soln: ', JSON.parse(JSON.stringify(rows)));
		res.json(JSON.parse(JSON.stringify(rows)));
	});  
});

// router.get('/education', function(req, res, next) {
// 	var field = req.query['option'];
// 	var num_rows = req.query['education_num'];
// 	var metric = req_query['metric'];
// 	console.log(metric + "METRIC");

// 	connection.query("SELECT n.name, AVG(s." + field + ") as category FROM neighborhoods n, located_in l, schools s WHERE n.id = l.neighborhood_id AND s.id = l.school_id GROUP by n.id ORDER BY category ASC LIMIT " + num_rows, function(err, rows, fields) {
// 		if(err) {
// 			console.log(err);
// 			res.send(500);
// 		}    
// 		console.log('soln: ', JSON.parse(JSON.stringify(rows)));
// 		res.json(JSON.parse(JSON.stringify(rows)));
// 	});  
// });





module.exports = router;

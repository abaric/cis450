var express = require('express');
var router = express.Router();

var mysql = require('mysql');


// var connection = mysql.createConnection({
//   host     : "rds-philly-guide.cww85eefiukb.us-east-1.rds.amazonaws.com",
//   user     : "guest",
//   password : "cis450guest",
//   port     : "3306",
//   database:  "phillyguide"
// });


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Philly Guide' });
 
//   if (req){
//   var table = req.query['table'];
//     console.log(table);
//     connection.query('SELECT * from ' + table, function(err, rows, fields) {
//         if(err) {
//           console.log(err);
//           res.send(500);
//         }    
//         console.log('The solution is: ', JSON.parse(JSON.stringify(rows)));
        
//         res.send(rows);
//     });
// }

});


module.exports = router;

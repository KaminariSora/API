var express = require('express')
var cors = require('cors')
var app = express()

// get the client
const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root ',
  port : '4306',
  database: 'travel',
});

app.use(cors())

app.get('/api/attractions', function (req, res, next) {
    // simple query
    connection.query(
        'SELECT * FROM `attractions` LIMIT 0, 10',
        function (err, results, fields) {
            console.log(results); // results contains rows returned by server
            res.json({result : results})
        }
    );
})

app.listen(5000, function () {
    console.log('CORS-enabled web server listening on port 5000')
})
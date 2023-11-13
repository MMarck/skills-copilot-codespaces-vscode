// Create web server with express
var express = require('express');
// Create web server with express
var app = express();
// Use body-parser
var bodyParser = require('body-parser');
// Use body-parser
app.use(bodyParser.urlencoded({extended: true}));
// Use body-parser
app.use(bodyParser.json());
// Use mysql
var mysql = require('mysql');
// Create connection with mysql
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'test'
});
// Connect to database
connection.connect(function(err){
	if(!err) {
		console.log("Database is connected ... nn");
	} else {
		console.log("Error connecting database ... nn");
	}
});
// Create server
var server = app.listen(3000, "localhost", function(){
	var host = server.address().address;
	var port = server.address().port;
	console.log("Example app listening at http://%s:%s", host, port)
});
// Display all comments
app.get('/comments', function(req, res){
	connection.query('SELECT * FROM comments', function (err, rows, fields) {
		if (!err) {
			console.log('The solution is: ', rows);
			res.send(rows);
		} else {
			console.log('Error while performing Query.');
		}
	});
});
// Display comment with id
app.get('/comments/:id', function(req, res){
	connection.query('SELECT * FROM comments WHERE id = ?', [req.params.id], function (err, rows, fields) {
		if (!err) {
			console.log('The solution is: ', rows);
			res.send(rows);
		} else {
			console.log('Error while performing Query.');
		}
	});
});
// Insert comment
app.post('/comments/add', function(req, res){
	connection.query('INSERT INTO comments SET ?', req.body, function (err, rows, fields) {
		if (!err) {
			console.log('The solution is: ', rows);
			res.send(rows);
		} else {
			console.log('Error while performing Query.');
		}
	});
});
// Update comment
app.post('/comments/update/:id', function(req, res){
	connection.query('UPDATE comments SET ? WHERE id = ?', [req.body, req.params.id], function (err, rows, fields) {
		if (!err) {
			console.log('The solution is: ', rows);
			res.send(rows);
        }
    })
});
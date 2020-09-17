var mysql = require('mysql');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

var connection = mysql.createConnection({
        host : 'localhost',
        user : 'root',
        database : 'join_us',
        password : '1994120912315Ls'
        });

// console.log(faker.internet.email());

//var q = 'SELECT * FROM users';
//connection.connect();
app.post("/register", function(req, res){
	var emailname = req.body.email;
	var person = {email: emailname};
	connection.query('INSERT INTO users SET ?', person, function(err, result){
		if(err) throw err;
		console.log(result);
		});
	console.log("A POST request has been send to /register, the email is " +req.body.email);
	res.send("You have successfully registered to this site!");
});


//app.get("/", function(req, res){
//	console.log("Hello!!!");
//	res.send("You have reached the home page!");
//	//res.render("home");
//});
app.get("/", function(req, res){
	var q = "SELECT count(*) AS count FROM users";

	var end_result = connection.query(q, function(err, results) {
  	if (err) throw err;
  	var count = results[0].count;
	console.log("A counting request has been made!");
	res.render("home", {count:count});
	//res.send("We have "+ count+ " users now!");
	});
});


app.listen(8080, function(){
	console.log("Server runs on port 8080");}
);
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
        database : 'travel_cost',
        password : '1994120912315Ls'
        });
        
app.get("/", function(req, res){
	console.log("A Main-page request has been made!");
	res.render("home");
	//res.send("We have "+ count+ " users now!");
	});

app.get("/register", function(req, res){
	console.log("A registration request has been made!");
	res.render("register");
	//res.send("We have "+ count+ " users now!");
	});

app.post("/registered", function(req, res){
  var username = req.body.username;
	var email = req.body.email;
  var password = req.body.password;
  var gender = req.body.gender;
  var company = req.body.company;
  
	var person = {email: email, company:company, username:username, isMale:gender};
	connection.query('INSERT INTO users SET ?', person, function(err, result){
		if(err) throw err;
		//console.log(result);
		});
   
  var q = "SELECT id FROM users WHERE username = '" + username + "';";

	var end_result = connection.query(q, function(err, results) {
  	if (err) throw err;
  	var userid = results[0].id;

  var passwd = {password:password, user_id:userid};
 	connection.query('INSERT INTO passwords SET ?', passwd, function(err, result){
		if(err) throw err;
		//console.log(result);
		});
   });
	console.log("A new user has been added to the database! The name is: " + username);
	//res.send("Welcome aboard! You have successfully registered to Travel Cost Log! We will send you back to main page in 5 second.");
  res.render("registered");
});


app.post("/signin", function(req, res){
  var email = req.body.email;
  var password = req.body.password;
  connection.query("SELECT '" + password + "'= (SELECT password FROM passwords JOIN users ON users.id=passwords.user_id WHERE email = '" + email + "') AS returnflag;", function(err, result){
		if(err) throw err;
		//console.log(result);
   var flag = result[0]['returnflag'];
   console.log(flag);
   if (flag==1) {res.render("sign_succ");console.log("A user has been logged into the system!");}
   else {res.render("sign_fail");console.log("A failed login attempt was made!");}   
		});
});


app.listen(8080, function(){
	console.log("Server runs on port 8080");}
);
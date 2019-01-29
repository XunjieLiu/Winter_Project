var mysql= require('mysql')
var connection = mysql.createConnection({
  host     : 'localhost', //enter host
  user     : 'root', //Enter user
  password : 'password', //enter password
  database : 'book' //Enter database name
});
connection.connect(function(err){
if(!err) {
    console.log("Database is connected");
} else {
    console.log("Database connection failed!");
}
});
module.exports = connection;

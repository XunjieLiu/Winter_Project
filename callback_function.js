function doHomework(subject, callback) {
  console.log(`Starting my ${subject} homework.`);
  callback(subject);
}

var mess = 'Hello'

doHomework('math', function(mess) {
	console.log("Finish my homework");
});
/*

var fs = require('fs');

// Open a stream
var rs = fs.createReadStream('sample.txt', 'utf-8');

rs.on('data', function (chunk){
	console.log("Data: ");
	console.log(chunk);
});

rs.on('end', function (){
	console.log("END");
});

rs.on('error', function (err){
	console.log('Error: ', err);
});
*/
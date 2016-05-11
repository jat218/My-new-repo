var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var csv = require("ya-csv");

app.use(express.static(__dirname + "/static"));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/hello', function(request, response) {
    response.send("Hello!!");
});

app.get('/goodbye', function(request, response) {
    response.send("Aloha!");
});

app.post('/signup', function(request, response){
    var user_name = request.body.visitorName;
    var user_email = request.body.visitorEmail;
    
    var database = csv.createCsvFileWriter("bookings.csv", {flags:"a"});
    var data = [user_name, user_email];
    database.writeRecord(data);
        
    database.writeStream.end();
        
    response.send(user_name);
});

app.listen(8000, function() {
    console.log("Server started");
});

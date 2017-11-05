var express = require('express');
var eventProjectController = require('./controller/eventprojectcontroller');


var app = express();

app.set('view engine','ejs');
//app.use('/assets',express.static('./stuff'));

app.use(express.static("stuff"));
app.use(express.static(__dirname + "stuff"));
eventProjectController(app);

app.listen(4000,function(){
  console.log("server eventProjectController is running");
});
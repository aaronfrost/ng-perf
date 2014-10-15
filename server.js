var port = 4000;

var express = require('express');
var app = express();

var fs = require('fs');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

//SET APP VARS
app.set('port', port);

//MIDDLEWARES
app.use(bodyParser());
app.use(methodOverride());
app.use(express.static(__dirname + '/public'));

//RETURN index.html for all angular routes. Wish there was a better way. For now, this is it.
app.set('paths',require('./ngpaths'));
app.get('paths').forEach(function(r){
  app.get(r.path, function(req, res){
    res.sendFile(process.cwd()+ '/public/index.html');
  });
});

app.get('/paths', function(req, res){
  res.json(app.get('paths'));
});


//LISTEN ON PORT
var server = app.listen(app.get('port'), function() {
  console.log('Listening on port %d', server.address().port);
});
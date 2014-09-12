var express = require('express');
var fs = require('fs');
var app = express();

app.get('/login', function(req, res) {
  res.sendfile('./login.html');
});

app.get('/register', function(req, res) {
  res.sendfile('./register.html');
});

app.use(express.static(__dirname + '/public'));

app.get(/^(.*)$/, function(req, res){
  console.log('req', req.params)
  path = '.' + req.params[0];

  console.log(path);
  fs.stat(path, function(err, stat) {
    if (err || !stat.isFile()) {
      path = './index.html';
    }
    console.log('Serving', path);
    res.sendfile(path);
  });
});

var server = app.listen(3000, function() {
  console.log('Listening on port %d', server.address().port);
});
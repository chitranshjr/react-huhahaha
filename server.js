var express = require('express');
var request = require('request');
var bodyParser = require('express-graphql/dist/parseBody').parseBody;

var app = express()
  .use('/graphql', function(req, res) {
    bodyParser(req, function (error, data) {
      error && console.error(error);
      request({
        url: 'https://todo-graphql-server.herokuapp.com/graphql',
        method: 'POST',
        headers: {
          'Content-Type': 'application/graphql'
        },
        body: data.query
      }, function(error, response, body){
        error && console.error(error);
        res.send(JSON.parse(body));
      });
    })
  } )
  .use(express.static(__dirname))
  .listen(process.env.PORT || 3000, function() {
    console.log('listening on *:' + (process.env.PORT || 3000) );
  });

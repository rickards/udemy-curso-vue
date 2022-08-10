const express = require('express');
const path = require('path')

const app = express();

app.use(express.static(__dirname + '/dist'));

// app.get(/.*/,(req,res)=>res.sendFile(path.resolve(__dirname,'dist/index.html')))

var server_port = process.env.PORT || 5000;
var server_host = process.env.PORT ? '0.0.0.0' : undefined;

const server = app.listen(server_port, server_host, () => {

  const host = server.address().address;
  const port = server.address().port;

  console.log('App listening at http://%s:%s', host, port);
});

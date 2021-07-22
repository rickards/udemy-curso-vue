const express = require('express');
const app = express();

app.use(express.static(__dirname + '/dist'));

var server_port = process.env.PORT || 5000;
var server_host = process.env.PORT ? '0.0.0.0' : undefined;

const server = app.listen(server_port, server_host, () => {

  const host = server.address().address;
  const port = server.address().port;

  console.log('App listening at http://%s:%s', host, port);
});

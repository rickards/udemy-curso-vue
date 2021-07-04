const express = require('express');
const app = express();

app.use(express.static(__dirname + '/dist'));

const server = app.listen(8081, () => {

  const host = server.address().address;
  const port = process.env.PORT || server.address().port;

  console.log('App listening at http://%s:%s', host, port);
});

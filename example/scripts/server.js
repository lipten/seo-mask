require('module-alias/register');
var app = require('./app');

var port = 8010
app.listen(port, function () {
  console.log('listening '+ port)
})
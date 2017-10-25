'use strict'

var app = require('./app');
var port = 8080;

app.listen(port, function () {
    console.log('Servidor escuchando en http://localhost:' + port);
});
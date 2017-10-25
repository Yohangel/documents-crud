'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'Clave_Secreta!_Test1234';

exports.createToken = function(user){
    var payload = {
        sub: user._id,
        name: user.name,
        username: user.username,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix()
    };
    return jwt.encode(payload, secret);
};
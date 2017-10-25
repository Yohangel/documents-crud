'use strict'

var fs = require('fs');
var path = require('path');
var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user');
var jwt = require('../services/jwt');
var mysql = require('mysql');
var dbconfig = require('../config/database');
var connection = mysql.createConnection(dbconfig.connection);
connection.query('USE ' + dbconfig.database);

function saveUser(req, res){
    var params = req.body;
    
    console.log(params);

    var name = params.name;
    var username = params.username;

    if(params.password){
        // Encriptar pasword
        bcrypt.hash(params.password, null, null, function(err, hash){
            var password = hash;
            if(username != null && name != null){
                // Guardar el usuario
                connection.query("SELECT * FROM users WHERE username = ?",[username], function(err, rows) {
                    if (err)
                    res.status(500).send({message: 'Error del servidor'});
                    if (rows.length) {
                        res.status(200).send({message: 'El usuario ya fue tomado'});
                    } else {
                        var insertQuery = "INSERT INTO users ( username, name, password ) values (?,?,?)";
                        connection.query(insertQuery,[username, name, password],function(err, rows) {
                            if(err){
                                res.status(500).send({message: 'Ocurrio un error guardando el usuario'});
                            } else {
                                connection.query("SELECT * FROM users WHERE username = ?",[username], function(err, rows){
                                    var user = rows[0];
                                    res.status(200).send({
                                        token: jwt.createToken(user)
                                    });
                                });
                            }                            
                        });
                    }
                });
            }else{
                res.status(200).send({message: 'Rellena todos los campos'});
            }
        });
    }else{
        res.status(200).send({message: 'Introduce la password'});
    }

};

function loginUser(req,res){
    var params = req.body;

    var username = params.username;
    var password = params.password;
    
    connection.query("SELECT * FROM users WHERE username = ?",[username], function(err, rows){
        if (err) {
            res.status(500).send({message: 'Error en la peticion'});
        } else {
            if (!rows.length) {
                res.status(200).send({message: 'El usuario no existe'});
            } else {
                var user = rows[0];
                bcrypt.compare(password, user.password, (err,check) => {
                    if(check){
                        res.status(200).send({
                            token: jwt.createToken(user)
                        });
                    }else{
                        res.status(200).send({message: 'Los datos del usuario son incorrectos'});
                    }
                });
            }
        }
    });
};

module.exports = {
    saveUser,
    loginUser
};
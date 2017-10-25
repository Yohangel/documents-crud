'use strict'

var mysql = require('mysql');
var dbconfig = require('../config/database');
var connection = mysql.createConnection(dbconfig.connection);
connection.query('USE ' + dbconfig.database);

function getDocument(req, res){
    var id = req.params.id;
    connection.query(" SELECT * FROM documents WHERE id = ? ",[id], function(err, rows){
        if (err) {
            res.status(500).send({message: 'Error en la peticion'});
        } else {
            if (!rows.length) {
                res.status(200).send({message: 'El documento no existe'});
            } else {
                var document = rows[0];
                res.status(200).send({document});
            }
        }
    });
};

function saveDocument(req, res){
    var params = req.body,
    folio = params.folio,
    buyer = params.buyer,
    total = 0;
    var insertQuery = "INSERT INTO documents ( date, folio, buyer, total ) values ( NOW(), ?, ?, ? )";
    connection.query(insertQuery,[folio, buyer, total],function(err, rows) {
        if(err){
            res.status(200).send({error: 'Error al guardar el documento'});
        }else{
            res.status(200).send({message: 'Documento guardado con exito'});
        }
    });
};

function getDocuments(req, res){
    connection.query(" SELECT * FROM documents ", function(err, rows){
        if (err) {
            res.status(500).send({message: 'Error en la peticion'});
        } else {
            if (!rows.length) {
                res.status(200).send({message: 'No ha agregado ningun documento'});
            } else {
                var documents = rows;
                res.status(200).send({documents});
            }
        }
    });
};

function deleteDocument(req,res){
    var id = req.params.id;
    connection.query(" DELETE FROM documents WHERE id="+id,function(err,rows) {
        if(err){
            res.status(500).send({message: 'Error al eliminar el documento'});
        }else{
            res.status(200).send({message: 'Documento eliminado con exito'});
        }
    });
};

module.exports = {
    getDocument,
    saveDocument,
    getDocuments,
    deleteDocument
};
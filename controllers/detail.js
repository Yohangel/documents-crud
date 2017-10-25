'use strict'

var mysql = require('mysql');
var dbconfig = require('../config/database');
var connection = mysql.createConnection(dbconfig.connection);
connection.query('USE ' + dbconfig.database);

function saveDetail(req, res) {
    var params = req.body,
        document_id = req.params.id,
        unit = params.unit,
        price = params.price,
        quantity = params.quantity,
        subtotal = price * quantity,
        description = params.description;

    var insertQuery = "INSERT INTO details ( document_id, unit, price, quantity, subtotal, description ) values (?,?,?,?,?,?)";
    connection.query(insertQuery, [document_id, unit, price, quantity, subtotal, description], function (err, rows) {
        if (err) {
            res.status(500).send({ message: 'Error al guardar el detalle' });
        } else {
            connection.query(" SELECT subtotal FROM details WHERE document_id = \"" + document_id + "\"", function (err, rows) {
                if (err) {
                    res.status(500).send({ message: 'Error al guardar el detalle' });
                } else {
                    var i = 0,
                        total = 0,
                        len = rows.length;
                    for (i; i < len; i++) {
                        total = total + rows[i].subtotal;
                    };
                    connection.query(" UPDATE documents set total=\"" + total + "\" WHERE id = \"" + document_id + "\" ", function (err, rows) {
                        if (err) {
                            res.status(500).send({ message: 'Error al guardar el detalle' });
                        } else {
                            res.status(200).send({ message: 'Detalle guardado con exito' });
                        }
                    });
                }
            });
        }
    });
};

function getDetail(req, res) {
    var id = req.params.id;
    connection.query(" SELECT * FROM details WHERE id = \"" + id + "\"", function (err, rows) {
        if (err) {
            res.status(500).send({ message: 'Error en la peticion' });
        } else {
            if (!rows.length) {
                res.status(200).send({ message: 'No existe' });
            } else {
                var details = rows;
                res.status(200).send({ details });
            }
        }
    });
};

function getDetails(req, res) {
    var document_id = req.params.id;
    connection.query(" SELECT * FROM details WHERE document_id = \"" + document_id + "\"", function (err, rows) {
        if (err) {
            res.status(500).send({ message: 'Error en la peticion' });
        } else {
            if (!rows.length) {
                res.status(200).send({ message: 'No ha agregado ningun detalle' });
            } else {
                var details = rows;
                res.status(200).send({ details });
            }
        }
    });
};

function updateDetail(req, res) {
    var id = req.params.id,
        params = req.body,
        unit = params.unit,
        price = params.price,
        quantity = params.quantity,
        subtotal = price * quantity,
        description = params.description;

    connection.query(" UPDATE details SET unit=\"" + unit + "\", price=\"" + price + "\", quantity=\"" + quantity + "\", subtotal=\"" + subtotal + "\", description=\"" + description + "\" WHERE id= \"" + id + "\"", function (err, rows) {
        if (err) {
            res.status(500).send({ message: 'Error al guardar el detalle: 1' });
        } else {
            connection.query(" SELECT * FROM details WHERE id = \"" + id + "\"", function (err, rows) {
                if (err) {
                    res.status(500).send({ message: 'Error al guardar el detalle: 2' });
                } else {
                    var doc_id = rows[0].document_id;
                    connection.query(" SELECT subtotal FROM details WHERE document_id = \"" + doc_id + "\"", function (err, rows) {
                        var i = 0,
                            total = 0,
                            len = rows.length;
                        for (i; i < len; i++) {
                            total = total + rows[i].subtotal;
                        };
                        connection.query(" UPDATE documents set total=\"" + total + "\" WHERE id = \"" + doc_id + "\" ", function (err, rows) {
                            if (err) {
                                res.status(500).send({ message: 'Error al guardar el detalle: 3' });
                            } else {
                                res.status(200).send({ message: 'Detalle guardado con exito' });
                            }
                        });
                    });
                }
            });
        };
    });
};

function deleteDetail(req, res) {
    var id = req.params.id;
    var doc_id = 0;
    connection.query(" SELECT * FROM details WHERE id = \"" + id + "\"", function (err, rows) {
        if (!err) doc_id = rows[0].document_id;
    });
    connection.query(" DELETE FROM details WHERE id=" + id, function (err, rows) {
        if (err) {
            res.status(500).send({ message: 'Error al eliminar el detalle' });
        } else {
            connection.query(" SELECT * FROM details WHERE id = \"" + id + "\"", function (err, rows) {
                if (err) {
                    res.status(500).send({ message: 'Error al eliminar el detalle: 2' });
                } else {
                    connection.query(" SELECT subtotal FROM details WHERE document_id = \"" + doc_id + "\"", function (err, rows) {
                        var i = 0,
                            total = 0,
                            len = rows.length;
                        for (i; i < len; i++) {
                            total = total + rows[i].subtotal;
                        };
                        connection.query(" UPDATE documents set total=\"" + total + "\" WHERE id = \"" + doc_id + "\" ", function (err, rows) {
                            if (err) {
                                res.status(500).send({ message: 'Error al eliminar el detalle: 3' });
                            } else {
                                res.status(200).send({ message: 'Detalle eliminado con exito' });
                            }
                        });
                    });
                }
            });
        }
    });
};

module.exports = {
    saveDetail,
    getDetails,
    getDetail,
    updateDetail,
    deleteDetail
};
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const dbConfig = require('../../dbConfig');
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

// router.get('/', (req, res) => {
//     res.json("Ruta origen");
// })

router.get('/marcas', (req, res) => {
    const connection = mysql.createConnection(dbConfig);
    connection.connect(function (error, result) {
        if (error) {
            throw error;
        } else {
            connection.query('SELECT * FROM marcas', function (err, result) {
                if (err) throw err;
                res.send(result).toString();
            })
        }
    })
});

router.get('/marcasXid/:id', (req, res) => {
    let id = req.params.id;
    const connection = mysql.createConnection(dbConfig);
    connection.connect(function (error, result) {
        if (error) {
            throw error;
        } else {
            connection.query('SELECT * FROM marcas WHERE idMarca = ?', [id], function (err, result) {
                if (err) throw err;
                res.send(result).toString();
            })
        }
    })
});

router.get('/articulosxid/:id', (req, res) => {
    let id = req.params.id;
    const connection = mysql.createConnection(dbConfig);
    connection.connect(function (error, result) {
        if (error) {
            throw error;
        } else {
            connection.query(`SELECT idArticulo, cat.descripcion, nombre AS marca, 
            tal.descripcion AS talle, precio, cantidad FROM articulos art
            JOIN categorias cat ON cat.idCategoria = art.idCategoria
            JOIN marcas mar ON art.idMarca = mar.idMarca
            JOIN talles tal ON tal.idTalle = art.idTalle
            WHERE art.idArticulo = ?;`, [id], function (err, result) {
                if (err) throw err;
                res.send(result).toString();
                console.log(result);
            })
        }
    })
})

router.get('/ventasxcliente/:id', (req, res) => {
    let id = req.params.id;
    const connection = mysql.createConnection(dbConfig);
    connection.connect(function (error, result) {
        if (error) {
            throw error;
        } else {
            connection.query(`SELECT c.nombre, c.apellido, ca.descripcion, m.nombre AS marca, 
            vxa.cantidad, vxa.precioUnit, vxa.totalArt, v.fecha  FROM clientes c 
            JOIN ventas v ON c.idClienteDNI = v.idCliente
            JOIN ventasxarticulo vxa ON v.idVenta = vxa.idVenta
            JOIN articulos a ON vxa.idArticulo = a.idArticulo
            JOIN categorias ca ON a.idCategoria = ca.idCategoria
            JOIN marcas m ON a.idMarca = m.idMarca
            WHERE c.idClienteDNI = ?`, [id], function (err, result) {
                if (err) throw err;
                res.send(result).toString();
                console.log(result);
            })
        }
    })
});

module.exports = router;
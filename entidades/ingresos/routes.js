const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const dbConfig = require('../../dbConfig');
const bodyParser = require('body-parser');
const { status } = require('express/lib/response');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// router.get('/', (req, res) => {
//     res.json("Ruta inicio de ingresos");
// });

router.post('/marcas', (req, res) => {
    const connection = mysql.createConnection(dbConfig);
    let marca = req.body.nombre;
    //let marca = "HoziShoes";
    let status;
    connection.connect(function (error, result) {
        if (error) {
            throw error;
        } else {
            connection.query('INSERT INTO marcas (nombre) VALUES (?)', [marca], function (err, result) {
                // if (err) throw err;
                // console.log("Response");
                // console.log(res);
                // res.send(result).toString();
                if (err) throw err;
                status = (res.statusCode).toString();
                res.send(status).toString();
                console.log(result);
            });
        };

    })

});

router.post('/talles', (req, res) => {
    const connection = mysql.createConnection(dbConfig);
    let talle = req.body.descripcion;
    let status;
    connection.connect(function (error, result) {
        if (error) {
            throw error;
        } else {
            connection.query('INSERT INTO talles (descripcion) VALUE (?)', [talle], function (err, result) {
                // if (err) throw err;
                // res.send(result).toString();
                if (err) throw err;
                status = (res.statusCode).toString();
                res.send(status).toString();
                console.log(result);
            })
        }
    })
})

router.post('/categorias', (req, res) => {
    const connection = mysql.createConnection(dbConfig);
    let categoria = req.body.descripcion;
    let status;
    connection.connect(function (error, result) {
        if (error) {
            throw error;
        } else {
            connection.query('INSERT INTO categorias (descripcion) VALUES (?)', [categoria], function (error, result) {
                if (error) throw error;
                status = (res.statusCode).toString();
                res.send(status).toString();
                console.log(result);
            })
        }
    })
})

router.post('/proveedores', (req, res) => {
    const connection = mysql.createConnection(dbConfig);
    let status;
    let proveedor = req.body;
    let proveedorArray = [
        proveedor.nombre,
        proveedor.telefono,
        proveedor.email
    ];
    connection.connect(function (error, result) {
        if (error) {
            throw error;
        } else {
            connection.query('INSERT INTO proveedores (nombre, telefono, email) VALUES (?, ?, ?)', proveedorArray,
                function (err, result) {
                    // if (err) throw err;
                    // res.send(result).toString();
                    // console.log(proveedorArray);
                    if (error) throw error;
                    status = (res.statusCode).toString();
                    res.send(status).toString();
                    console.log(result);
                })
        }
    })
})

router.post('/articulos', (req, res) => {
    const connection = mysql.createConnection(dbConfig);
    let status;
    let articulo = req.body;
    let articuloArray = [
        articulo.idArticulo,
        articulo.idMarca,
        articulo.idTalle,
        articulo.idCategoria,
        articulo.idProveedor,
        articulo.precio,
        articulo.costo,
        articulo.cantidad
    ];
    connection.connect(function (error, result) {
        if (error) {
            throw error;
        } else {
            connection.query(`INSERT INTO articulos VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, articuloArray,
                function (err, result) {
                    if (err) throw err;
                    status = (res.statusCode).toString();
                    res.send(status).toString();
                    console.log(result);
                })
        }
    })
})


router.post('/clientes', (req, res) => {
    const connection = mysql.createConnection(dbConfig);
    let cliente = req.body;
    clienteArray = [
        // cliente.idClienteDNI,
        cliente.dni, //esta linea se agrego para probar el form de registra
        cliente.nombre,
        cliente.apellido,
        cliente.telefono,
        cliente.email,
        cliente.direccion
    ];

    let status;

    connection.connect(function (error, result) {
        if (error) {
            throw error;
        } else {
            connection.query('INSERT INTO clientes VALUES (?, ?, ?, ?, ?, ?)', clienteArray,
                function (err, result) {
                    if (err) throw err;
                    status = (res.statusCode).toString();
                    res.send(status).toString();
                    console.log(result);
                })
        }
    })
})

module.exports = router;
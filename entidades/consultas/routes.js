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

router.get('/ventas2', (req, res) => {
    res.json({ventas: ["venta3", "venta4"]});
})

module.exports = router;
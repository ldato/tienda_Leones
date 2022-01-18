const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const dbConfig = require('../../dbConfig');
const bodyParser = require('body-parser');
const { status } = require('express/lib/response');

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

router.get('/', (req, res) => {
    res.json("Ruta inicio de ingresos");
});

router.get('/consulta', (req, res) => {
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

router.get('/consulta2', (req, res) => {
    res.json({ingresos: ["ingresos3", "ingresos4"]});
});

router.post('/marcas', (req, res) => {
    const connection = mysql.createConnection(dbConfig);
    let marca = req.body.nombre;
    //let marca = "HoziShoes";
    connection.connect (function (error, result) {
        if (error) {
            throw error;
        } else {
            connection.query('INSERT INTO marcas (nombre) VALUES (?)', [marca], function (err, result) {
                if (err) throw err;
                res.send(result).toString();
            });
        };
       
    })
    
})

module.exports = router;
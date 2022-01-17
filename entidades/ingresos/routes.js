const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const dbConfig = require('../../dbConfig');

router.get('/', (req, res) => {
    res.json("Ruta inicio de ingresos");
});

router.get('/consulta', (req, res) => {
    res.json({ingresos: ["ingreso1", "ingreso2"]});
});

router.get('/consulta2', (req, res) => {
    res.json({ingresos: ["ingresos3", "ingresos4"]});
});

router.post('/marcas', (req, res) => {
    const connection = mysql.createConnection(dbConfig);
    // let marca = req.body.nombre;
    let marca = "HoziShoes";
    connection.connect(function (error) {
        if (error) {
            throw error;
        } else {
            console.log("Conexión establecida");
        };

        let query = connection.query('INSERT INTO marcas (nombre) VALUES (?)', [marca]);
    })
})

module.exports = router;
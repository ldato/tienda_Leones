const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json("Ruta inicio de ingresos");
});

router.get('/consulta', (req, res) => {
    res.json({ingresos: ["ingreso1", "ingreso2"]});
});

router.get('/consulta2', (req, res) => {
    res.json({ingresos: ["ingresos3", "ingresos4"]});
});

module.exports = router;
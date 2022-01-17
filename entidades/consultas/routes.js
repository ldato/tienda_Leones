const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json("Ruta origen");
})

router.get('/ventas', (req, res) => {
    res.json({ventas: ["venta1", "venta2"]});
})

router.get('/ventas2', (req, res) => {
    res.json({ventas: ["venta3", "venta4"]});
})

module.exports = router;
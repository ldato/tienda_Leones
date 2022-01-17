const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    res.json("Ruta origen Ventas");
})

router.post("/venta", (req, res) => {
    res.json("Se realizo una venta");
})

router.get("/ventaXcliente", (req, res) => {
    res.json({cliente: ["venta1", "venta2"]});
})


module.exports = router;
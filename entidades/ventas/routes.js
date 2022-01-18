const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const dbConfig = require('../../dbConfig');
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

router.post("/venta", (req, res) => {
    res.json("Se realizo una venta");
})

// router.get("/ventaXcliente", (req, res) => {
//     res.json({cliente: ["venta1", "venta2"]});
// })


module.exports = router;
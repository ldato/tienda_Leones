const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const dbConfig = require('../../dbConfig');
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

//------------------------------------------PRUEBA DE VENTA CON FUNCION------------------------------------

// const Vender = async () => {
//     router.post("/venta", (req, res) => {
//         const connection = mysql.createConnection(dbConfig);
//         let venta = req.body;
//         connection.connect(function (error, result) {
//             try {
//                 let ventaArray = [
//                     venta.idClienteDNI,
                    

//                 ]
//             } catch (error) {
//                 throw error;
//             }
//         })
//     })
// }

//----------------------------------------------------------------------------------------------------------

router.post("/venta", (req, res) => {
    const connection = mysql.createConnection(dbConfig);
    //let venta = req.body;
    //variables para prueba
    let venta = [{articulo: "ASD123", cantidad:2, precio: 300}, {articulo:"DSA321", cantidad:1, precio: 500}]
    let clienteDNI = 12345678;
    let total = 1100; 
    let resultQuery = {};
    
     connection.connect(async function (error, result) {
         if (error) {
             throw error;
         } else {
             connection.query('INSERT INTO ventas (idCliente, fecha, total) VALUES (?, NOW(), ?)', 
             [clienteDNI, total], async function (error, result ) {
                 if (error) throw error;
                 resultQuery = await result;
                 res.send(resultQuery).toString();
                 console.log(resultQuery);
                 for (let i = 0; i < venta.length; i++) {
                     let totalArt = (venta[i].precio * venta[i].cantidad);
                     connection.query('INSERT INTO ventasxarticulo VALUES (?, ?, ?, ?, ?)',
                     [resultQuery.insertId, venta[i].articulo, venta[i].cantidad, venta[i].precio, totalArt], async function (error, result) {
                         if (error) throw error;
                         await result;
                          //res.send(result).toString();
                          //console.log(result);
                     } )
                     
                 }
             } )
         }
     })
    
})

// router.get("/ventaXcliente", (req, res) => {
//     res.json({cliente: ["venta1", "venta2"]});
// })


module.exports = router;
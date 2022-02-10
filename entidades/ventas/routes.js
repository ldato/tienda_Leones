const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const dbConfig = require('../../dbConfig');
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));
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
    let venta = req.body.venta;
    //variables para prueba
    //let venta = [{articulo: "ASD123", cantidad:2, precio: 300}, {articulo:"DSA321", cantidad:1, precio: 500}]
    let clienteDNI = req.body.clienteDNI;
    let total = req.body.total;
    let resultQuery = {};
    let status;
    const date = new Date();
    //let fecha = date.getDate();
    console.log("venta");
    console.log(venta);
    console.log("clienteDNI");
    console.log(clienteDNI);
    console.log("total");
    console.log(total);

    connection.connect(async function (error, result) {
        if (error) {
            throw error;
        } else {
            connection.query('INSERT INTO ventas (idCliente, fecha, total) VALUES (?, NOW(), ?)',
                [clienteDNI, total], async function (error, result) {
                    if (error) throw error;
                    resultQuery = await result;
                    //res.send(resultQuery).toString();
                    status = (res.statusCode).toString();
                    res.send(status);                    
                    console.log("Query Venta Result");
                    console.log(resultQuery);
                    for (let i = 0; i < venta.length; i++) {
                        let totalArt = (venta[i][0].precio * venta[i][0].cantidad);
                        connection.query('INSERT INTO ventasxarticulo VALUES (?, ?, ?, ?, ?)',
                            [resultQuery.insertId, venta[i][0].idArticulo, venta[i][0].cantidad, venta[i][0].precio, totalArt], async function (error, result) {
                                if (error) throw error;
                                await result;
                                console.log("Query ventaxarticulo Result");
                                console.log(result);
                                console.log("Response");
                                console.log(res.statusCode);
                                console.log("Status");
                                console.log(status);
                                // res.send(res.statusCode).toString();
                            })

                    }
                })
        }
    })
})

// router.get("/ventaXcliente", (req, res) => {
//     res.json({cliente: ["venta1", "venta2"]});
// })


module.exports = router;
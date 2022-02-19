
const express = require("express")
const productRout = express.Router()
const connection = require("../../db/index")



productRout.post('/', (req, res) => {
    const {pro_name, details, price} = req.body
    const sql = `INSERT INTO pro_list (pro_name, details, price) VALUES ("${pro_name}", "${details}", ${price});`
    connection.query(sql, (error, result) => {
        if (error) {
            res.status(400).json({
                success: false,
                error: true,
                massage: "internal server error",
                obj: null
            })
        } else {
            res.status(200).json({
                success: true,
                error: false,
                massage: "Item created",
                obj: result
            })
        }
    })
})

productRout.get('/', (req, res) => {
    const sql = `SELECT * FROM pro_list;`
    connection.query(sql, (error, result) => {
        if (error) {
            res.status(400).json({
                success: false,
                error: true,
                massage: "internal server error",
                obj: null
            })
        } else {
            res.status(200).json({
                success: true,
                error: false,
                massage: "Got all info",
                obj: result
            })
        }
    })
})

productRout.put('/', (req, res) => {
    const {pro_name, details, price, id} = req.body
    const sql = `UPDATE pro_list SET pro_name = "${pro_name}", details = "${details}", price = ${price} WHERE id = ${id} `
    connection.query(sql, (error, result) => {
        if (error) {
            res.status(400).json({
                success: false,
                error: true,
                massage: "internal server error",
                obj: null
            })
        } else {
            res.status(200).json({
                success: true,
                error: false,
                massage: "Successfully Update Your Data",
                obj: result
            })
        }
    })
})

productRout.delete('/', (req, res) => {
    const {id} = req.body
    const sql = `DELETE FROM pro_list WHERE id = ${id};`
    connection.query(sql, (error, result) => {
        if (error) {
            res.status(400).json({
                success: false,
                error: true,
                massage: "internal server error",
                obj: null
            })
        } else {
            res.status(200).json({
                success: true,
                error: false,
                massage: "Delete successfully",
                obj: result
            })
        }
    })
})



module.exports = productRout;
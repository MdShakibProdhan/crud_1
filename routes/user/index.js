const express = require("express")
const userRout = express.Router()
const colors = require('colors');
const connection = require("../../db/index")
const bcrypt = require('bcrypt')








userRout.post('/', (req, res) => {
    console.log(colors.yellow('POST -> /api/user/'));
    const {full_name, user_email, user_password} = req.body

    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            res.status(500).json({
                success: false,
                error: true,
                massage: "something went wrong",
                obj: null
            })
        }else{
            bcrypt.hash(user_password, salt, (hasherr, mainPassword) => {
                if (hasherr) {
                    res.status(500).json({
                        success: false,
                        error: true,
                        massage: "something went wrong",
                        obj: null
                    })
                }else{
                    const sql = `INSERT INTO users (full_name, user_email, user_password) VALUES ("${full_name}", "${user_email}", "${mainPassword}");`
                    connection.query(sql, (error, result) => {
                        if (error) {
                            res.status(400).json({
                                success: false,
                                error: true,
                                massage: "internal server error",
                                obj: null
                            })
                        } else {
                            res.status(201).json({
                                success: true,
                                error: false,
                                massage: "New User Created",
                                obj: result
                            })
                        }
                    })
                }
            })
        }
    })
})


userRout.get('/', (req, res) => {
    console.log(colors.green('GET -> /api/user/'));
    const sql = `SELECT * FROM users;`
    connection.query(sql, (error, result) => {
        if (error) {
            res.status(400).json({
                success: false,
                error: true,
                massage: "internal server error",
                obj: null
            })
        } else {
            res.status(201).json({
                success: true,
                error: false,
                massage: "User List Found",
                obj: result
            })
        }
    })
})


userRout.put('/', (req, res) => {
    console.log(colors.cyan('PUT -> /api/user/'));
    const {full_name, user_email, user_password, id} = req.body
    const sql = `UPDATE users SET full_name = "${full_name}", user_email = "${user_email}", user_password = "${user_password}" WHERE id = ${id} ;`
    connection.query(sql, (error, result) => {
        if (error) {
            res.status(400).json({
                success: false,
                error: true,
                massage: "internal server error",
                obj: null
            })
        } else {
            res.status(201).json({
                success: true,
                error: false,
                massage: "Upadate done",
                obj: result
            })
        }
    })
})


userRout.delete('/', (req, res) => {
    console.log(colors.red('DELETE -> /api/user/'));
    const {id} = req.body
    const sql = `DELETE FROM users WHERE id = ${id};`
    connection.query(sql, (error, result) => {
        if (error) {
            console.log(error);
            res.status(400).json({
                success: false,
                error: true,
                massage: "internal server error",
                obj: null
            })
        } else {
            res.status(201).json({
                success: true,
                error: false,
                massage: "Delete done",
                obj: result
            })
        }
    })
})



module.exports = userRout;
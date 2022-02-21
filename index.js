require("dotenv").config()
const express = require("express")
const app = express()

const port = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))

app.use('/api', require("./routes/index"))



// listen
app.listen(port, () => {
    console.log("port is: ", port);
})
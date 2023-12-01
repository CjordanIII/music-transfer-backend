const express = require('express')
const app = express()
const cors = require("cors");
const morgan = require('morgan')

// controllers
const controller = require("./controllers/controller")



// port config
const port = process.env.PORT || 3001;



//Middle wear

app.use(express.json())
app.use(express.static("public"));
app.use(cors({ origin: "http://localhost:3000" }));

app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));




//routes
app.get("/redirect", controller.hello);









app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})


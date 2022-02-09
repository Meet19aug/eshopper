const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
// Cloudinary added
const fileUpload = require("express-fileupload");
//Deployment
const path=require("path") 
const errorMiddleware = require("./middleware/error")

const dotenv = require("dotenv"); 
//config
// dotenv.config({path: "backend/config/config.env"})
//config -- used when we run on local host but for heroku deployment we have heroku funcitonality to add config veriable.
if(process.env.NODE_ENV!=="PRODUCTION"){
    require("dotenv").config({path: "backend/config/config.env"})
}

// When you requred to use POST & PUT REQUESTS as in this request we are sendind data or json OBject to server not needed for DELETE & GET
app.use(express.json());
app.use(cookieParser());
//for Cloudinary Use
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());

//Routs imports
const product = require("./routes/productRouts")
const user = require("./routes/userRouts")
const order = require("./routes/orderRouts")
const payment = require("./routes/paymentRouts")



//The app.use() function is used to mount the specified middleware function(s) at the path which is being specified. It is mostly used to set up middleware for your application.
app.use("/api/v1", product);
app.use("/api/v1/",user);
app.use("/api/v1/",order);
app.use("/api/v1/",payment)

// Deployment
app.use(express.static(path.join(__dirname,"../frontend/build")));

app.get("*", (req,res)=>{
    res.sendFile(path.resolve(__dirname,"../frontend/build/index.html"))
})



//Middleware for error
app.use(errorMiddleware)


module.exports = app;
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors")
const ejs = require("ejs")
dotenv.config({path:'./.env'})
const app = express();
const cookieParser = require("cookie-parser")
const errorHandler = require("./controllers/errorController")


// routers
const userRouter = require("./routers/userRouter")
const reviewRouter = require("./routers/reviewRouter")
const groomerRouter = require("./routers/GroomerRouter");
const packageRouter = require("./routers/packageRouter");
const bookingRouter = require('./routers/bookingRouter');

// Applying middlewares
app.set('view engine', ejs);
app.use(express.json());  // middleware to parse the request body
app.use(cors({
    origin:["http://localhost:5173", "http://192.168.0.108:5173", "https://pet-linc-z3ed.vercel.app", "https://rheologic-alana-minutial.ngrok-free.dev","https://2wwpqd0t-5173.inc1.devtunnels.ms/", "https://rheologic-alana-minutial.ngrok-free.dev", "*"],
    credentials:true
}))
app.use(cookieParser());

// mounting api routes
app.use("/api/v1/users", userRouter)
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/groomers", groomerRouter)
app.use('/api/v1/packages', packageRouter);
app.use('/api/v1/bookings', bookingRouter);



app.use(errorHandler)

module.exports = app;
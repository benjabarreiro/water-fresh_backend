require('dotenv').config();
const express = require("express");
const app = express();

const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");

const mongoose = require('mongoose')
const router = require('./routes.js')



app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  
    next();
  });

app.use(cors())

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static folder
app.use("/public", express.static(path.join(__dirname, "public")));

app.use('/', router);

// serve PORT running here
const PORT = process.env.PORT || 8080;

mongoose.connect('mongodb+srv://benja-barreiro:benja123@cluster0.g6ufp.mongodb.net/water-fresh?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if(err) throw new Error(`Error en la conexión con la base de datos ${err}`);
    console.log('Base de datos conectada');
    
    const server = app.listen(process.env.PORT || 5000, () => console.info(`server has started on ${PORT}`));
    server.on('error', error => console.log(`Error en el Servidor ${error}`));
});
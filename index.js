const express = require("express");
require("dotenv").config();
const { dbConnection } = require("./db/config");
const cors = require("cors");

const port = process.env.PORT;
//crear servidor de express
const app = express();

app.use(cors());

//lectura y parseo del body
app.use(express.json());

//conexion a DB
dbConnection();

//rutas
app.use("/api/users", require("./routes/users"))

app.use("/api/locations", require("./routes/locations"))

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});

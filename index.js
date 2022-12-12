const express = require("express");
require("dotenv").config();

const port = process.env.PORT;
//crear servidor de express
const app = express();

//rutas
app.use("/api/users", require("./routes/users"))

app.use("/api/locations", require("./routes/locations"))

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});

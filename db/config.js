const mongoose = require("mongoose");
require("dotenv").config();

const dbCnn = process.env.MONGO_DB_CNN;

const dbConnection = async () => {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(dbCnn, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("DB Online");
  } catch (error) {
    console.log("error = ", { error });
    throw new Error("Error al conectar a DB");
  }
};

module.exports = {
  dbConnection,
};

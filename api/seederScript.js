require("dotenv").config();

const productData = require("./products");
const connectDB = require("./db");
const Product = require("./models/Todo");
const mongoose = require("mongoose");

mongoose.set('strictQuery', true);

connectDB();

const importData = async () => {
  try {
    await Product.deleteMany({});

    await Product.insertMany(productData);

    console.log("Data Import Success");

    process.exit();
  } catch (error) {
    console.error("Error with data import", error);
    process.exit(1);
  }
};

importData();








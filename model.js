const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const products = new Schema({
  productName: String,
  description: String,
  img: String,
  category: String,
  price: Number,
});

const product = mongoose.model("products", products);

module.exports = product

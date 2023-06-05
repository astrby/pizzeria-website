const mongoose  = require("mongoose");

const productSchema = mongoose.Schema({
    productName: String,
    productDescription: String,
    productCategory: String,
    urlImage: String
}, {collection: 'products'});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
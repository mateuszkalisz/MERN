const mongoose = require('mongoose');
const Product = require('./models/product');
const credentials = require('./credentials');

const url = `mongodb+srv://admin:${credentials.password}@cluster0-truce.mongodb.net/products_test?retryWrites=true&w=majority`

mongoose.connect(url).then(()=>{
    console.log('Connected to database');
}).catch(()=>{
    console.log('Connection failed!');
});

const createProduct = async (req,res,next)=>{
    const createdProduct = new Product({
        name: req.body.name,
        price: req.body.price
    });

    const result = await createdProduct.save();
    
    res.json(result);

};

const getProducts = async (req,res,next)=>{
    const products = await Product.find().exec();
    res.json(products);
}

exports.createProduct = createProduct; 
exports.getProducts = getProducts;
// Yza Castro - 301272405
// app.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productController = require('./productController');

const app = express();
const port = 3000;


mongoose.connect('mongodb://localhost/DressStore', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;


db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});


app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.json({ message: 'Welcome to DressStore application.' });
});


app.get('/api/products', productController.getAllProducts);
app.get('/api/products/:id', productController.getProductById);
app.post('/api/products', productController.addNewProduct);
app.put('/api/products/:id', productController.updateProductById);
app.delete('/api/products/:id', productController.removeProductById);
app.delete('/api/products', productController.removeAllProducts);
app.get('/api/products/search', productController.findProductsByName);


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Yza Castro - 301272405
// productController.js

const Product = require('./product');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addNewProduct = async (req, res) => {
  const { name, description, price } = req.body;

  try {
    const newProduct = new Product({ name, description, price });
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateProductById = async (req, res) => {
    const { name, description, price } = req.body;
  
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        { name, description, price },
        { new: true } 
      );
  
      if (!updatedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      res.json(updatedProduct);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  
  exports.removeProductById = async (req, res) => {
    try {
      const removedProduct = await Product.findByIdAndRemove(req.params.id);
  
      if (!removedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      res.json({ message: 'Product removed successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  exports.removeAllProducts = async (req, res) => {
    try {
      await Product.deleteMany();
      res.json({ message: 'All products removed successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  exports.findProductsByName = async (req, res) => {
    const { name } = req.query;
  
    try {
      const products = await Product.find({ name: { $regex: name, $options: 'i' } });
      res.json(products);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

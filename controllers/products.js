const Product = require("../models/product");

async function getAllProductsStatic(req, res) {
  const products = await Product.find({
    featured: true,
  });
  res.status(200).json({ products, nbHits: products.length });
}
async function getAllProducts(req, res) {
  const products = await Product.find(req.query);
  res.status(200).json({ products, nbHits: products.length });
}

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};

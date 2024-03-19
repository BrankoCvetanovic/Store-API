const Product = require("../models/product");

async function getAllProducts(req, res) {
  const { featured, company, name, sort, fields, numericFilters } = req.query;
  const queryObject = {};
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    const options = ["price", "rating"];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }
  let sortValue = "createdAt";
  if (sort) {
    sortValue = sort.split(",").join(" ");
  }
  let fieldsValue = "";
  if (fields) {
    fieldsValue = fields.split(",").join(" ");
  }

  const limit = Number(req.query.limit) || 10;
  const page = Number(req.query.page) || 1;
  const skip = (page - 1) * limit;

  const products = await Product.find(queryObject)
    .sort(sortValue)
    .select(fieldsValue)
    .limit(limit)
    .skip(skip);
  res.status(200).json({ products, nbHits: products.length });
}

module.exports = {
  getAllProducts,
};

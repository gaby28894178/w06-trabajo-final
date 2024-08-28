const Cart = require("./Cart");
const Category = require("./Category");
const Product = require("./Product");
const ProductImg = require("./ProductImg");
const Purchase = require("./Purchase");
const User = require("./User");

// Relación entre Product y Category (Product -> categoryId)
Product.belongsTo(Category);
Category.hasMany(Product);

// Relación entre Cart y User (Cart -> userId)
Cart.belongsTo(User);
User.hasMany(Cart);

// Relación entre Cart y Product (Cart -> productId)
Cart.belongsTo(Product);
Product.hasMany(Cart);

// Relación entre Purchase y User (Purchase -> userId)
Purchase.belongsTo(User);
User.hasMany(Purchase);

// Relación entre Purchase y Product (Purchase -> productId)
Purchase.belongsTo(Product);
Product.hasMany(Purchase);

// Relación entre ProductImg y Product (ProductImg -> productId)
ProductImg.belongsTo(Product);
Product.hasMany(ProductImg);

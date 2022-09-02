import express from "express";
import { authenticateDB, syncModels } from "./db/index.js";
import cors from "cors";
import productsRouter from "./apis/products/index.js"
import usersRouter from "./apis/users/index.js"
import categoriesRouter from "./apis/categories/index.js"
import reviewsRouter from "./apis/reviews/index.js"
import User from "./apis/users/modal.js"
import Category from "./apis/categories/modal.js";
import Product from "./apis/products/modal.js";
import Review from "./apis/reviews/modal.js";
import ProductCategory from "./apis/products/productCategoriesModel.js"

User.hasMany(Review);
Review.belongsTo(User);

Product.hasMany(Review);
Review.belongsTo(Product);

Category.belongsToMany(Product, {through: ProductCategory })
Product.belongsToMany(Category, {through: ProductCategory})

const server = express();

server.use(express.json());

server.use(cors());
server.use("/products", productsRouter);
server.use("/users", usersRouter);
server.use("/categories", categoriesRouter);
server.use("/reviews", reviewsRouter);

const { PORT = 4001 } = process.env;

const initalize = async () => {
    try {
      server.listen(PORT, async () => {
        console.log("✅ Server is listening on port " + PORT);
      });
  
      server.on("error", (error) => {
        console.log("❌ Server is not running due to error : " + error);
      });
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  authenticateDB()
    .then(async () => {
      await syncModels();
    })
    .then(() => {
      initalize();
    })
    .catch((e) => console.log(e));
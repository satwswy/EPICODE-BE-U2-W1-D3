import express, { query } from "express";
import Product from "./modal.js";
import sequelize from "../../db/index.js";
import ProductCategory from "./productCategoriesModel.js";
import Category from "../categories/modal.js";
import Review from "../reviews/modal.js";


const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
   
    const products = await Product.findAll({
      include: [
        Review,
        {
          model: Category,
          attributes: ["name", "id"],
          through: { attributes: [] },
        },
      ],
    });

    
    res.send(products);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
   
    const user = await Product.findByPk(req.params.id);
    res.send(user);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const product = await Product.create(req.body);

    res.send(product);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const product = await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
      returning: true,
    });
    res.send(product);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const product = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.send({ rows: product });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post("/:productId/add/:categoryId", async (req, res, next) => {
  try {
    const result = await ProductCategory.create({
      categoryId: req.params.categoryId,
      productId: req.params.productId,
    });

    res.send(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.delete("/:productId/delete/:categoryId", async (req, res, next) => {
  try {
    const result = await ProductCategory.destroy({
      where: {
        categoryId: req.params.categoryId,
        productId: req.params.productId,
      },
    });
    res.send({ rows: result });
  } catch (error) {
    console.log(error);
  }
});

export default router;
import express from "express";
import Category from "./model.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const categories = await Category.findAll();
    res.send(categories);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post("/bulk", async (req, res, next) => {
  try {
    const categories = await Category.bulkCreate([
      { name: "category1" },
      { name: "category2" },
      { name: "category3" },
      { name: "category4" },
      { name: "category5" },
    ]);
    res.send(categories);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default router;
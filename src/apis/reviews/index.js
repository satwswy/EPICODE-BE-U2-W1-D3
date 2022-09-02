import express, { query } from "express";
import Review from "./modal.js";
import sequelize from "../../db/index.js";
import User from "../users/modal.js";


const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
   
    const reviews = await Review.findAll({
        include: User
    });

    res.send(reviews);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    
    const review = await Review.findByPk(req.params.id);
    res.send(review);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const review = await Review.create(req.body);

    res.send(review);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const reviews = await Review.update(req.body, {
      where: {
        id: req.params.id,
      },
      returning: true,
    });
    res.send(reviews);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const reviews = await Review.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.send({ rows: reviews });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default router;
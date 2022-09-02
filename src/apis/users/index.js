import express, { query } from "express";
import User from "./modal.js";
import sequelize from "../../db/index.js";


const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
   
    const users = await User.findAll();

    res.send(users);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    // const user = await User.findAll({
    //   where: {
    //     id: req.params.id,
    //   },
    // });
    const user = await User.findByPk(req.params.id);
    res.send(user);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const user = await User.create(req.body);

    res.send(user);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const users = await User.update(req.body, {
      where: {
        id: req.params.id,
      },
      returning: true,
    });
    res.send(users);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const users = await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.send({ rows: users });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default router;

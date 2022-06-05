const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const controller = require("./controller.js");

function verifyToken(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      throw new Error("Hubo un problema");
    }

    const decodedToken = jwt.verify(token, "secretKey");
    console.log(decodedToken);
    req.userData = { userId: decodedToken.userId };

    next();
  } catch (err) {
    res.sendStatus(403);
  }
}

router.post("/access", controller.sendEmail);

router.post("/create", verifyToken, controller.create);

router.get("/list", controller.listar);

router.put("/update", verifyToken, controller.update);

router.delete("/delete/:id", verifyToken, controller.delete);

router.post("/login", controller.login);

module.exports = router;

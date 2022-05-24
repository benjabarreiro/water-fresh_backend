const express = require("express");
const router = express.Router();
const cors = require('cors')

const controller = require("./controller.js");

function verifyToken(req, res, next){
	const bearerHeader =  req.headers['authorization'];

	if(typeof bearerHeader !== 'undefined'){
		 const bearerToken = bearerHeader.split(" ")[1];
		 req.token  = bearerToken;
		 next();
	}else{
		res.sendStatus(403);
	}
}

router.post("/access", cors(), controller.sendEmail);

router.post("/create", verifyToken, controller.create);

router.get("/list", controller.listar);

router.put("/update", verifyToken, controller.update);

router.delete("/delete/:id", controller.delete);

router.post("/login", controller.login);

module.exports = router;

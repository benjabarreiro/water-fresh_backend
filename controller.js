const sendEmail = require("./nodeMailer");
const product = require("./model.js");
const jwt = require("jsonwebtoken");

const controller = {
  sendEmail: async (req, res) => {
    try {
      console.log("success");
      console.log(req.body);
      return await sendEmail(req, res);
    } catch (err) {
      console.log("Hubo un error en el servicio");
    }
  },
  create: async (req, res) => {
    let producto = req.body;

    try {
      const newProduct = new product(producto);
      await newProduct.save();
      res.send("Producto cargado exitósamente");
    } catch (error) {
      res.send("Hubo un error al agregar el producto");
    }
  },
  listar: (req, res) => {
    product.find({}, (err, products) => {
      if (err) throw new Error(`Error en la lectura de productos: ${err}`);

      const water = products.filter((water) => water.category === "agua");
      const pulp = products.filter((pulp) => pulp.category === "pulpa");

      res.send({ water, pulp });
    });
  },

  update: (req, res) => {
    const { _id } = req.body;
    console.log("lo que viene", req.body);
    product
      .updateOne({ _id: _id }, { $set: req.body })
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  },

  delete: (req, res) => {
    const { id } = req.params;
    console.log(req.params, id);
    product
      .deleteOne({ _id: id })
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  },

  login: async (req, res, next) => {
    const { user, password } = req.body;

    const userDB = {
      id: 1,
      password: "henry",
      user: "henry",
    };

    if (user !== userDB.user) {
      res.send("Credenciales invalidas").status(500);
    }

    if (password !== userDB.password) {
      res.send("Credenciales invalidas").status(500);
    }
    let token;
    try {
      token = jwt.sign({ userId: userDB.id, user: userDB.user }, "secretkey", {
        expiresIn: "3h",
      });
    } catch (err) {
      console.log("token falla");
      res.send("Falló login").status(500);
    }
    console.log(token);
    res.send({ userId: userDB.id, user: userDB.user, token });
  },
};

module.exports = controller;

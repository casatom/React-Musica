var express = require("express");
var router = express.Router();
var usuariosModel = require("./../../models/usuariosModel");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.render("admin/login", {
    layout: "admin/layout",
  });
});

router.post("/", async (req, res, next) => {
  try {
    var usuario = req.body.username;
    var contra = req.body.password;

    var data = await usuariosModel.getUserByUsernameAndPasswordAdmin(
      usuario,
      contra
    );

    if (data != undefined) {
      req.session.id_usuario = data.id;
      req.session.nombre = data.usuario;
      req.session.admin = 1
      res.redirect("/admin/home");
    } else {
      res.render("admin/login", {
        layout: "admin/layout",
        error: true,
      });
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/logout", function (req, res) {
  req.session.destroy();
  res.redirect("/admin/login");
});

module.exports = router;

var express = require("express");
var router = express.Router();

router.get("/exibirpontos/:id", function(req, res) {
    graficosController.exibirpontos(req, res);
});

module.exports = router;
var database = require("../database/config");

function exibirpontos(id) {
  var instrucaoSql = `SELECT pontosquiz FROM usuario WHERE id = ${id};`;

  return database.executar(instrucaoSql);
}

module.exports = { exibirpontos };

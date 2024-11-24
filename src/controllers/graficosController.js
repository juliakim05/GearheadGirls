var graficosModel = require("../models/graficosModel");

function exibirpontos(id) {
    var id = req.params.id;

    graficosModel.exibirpontos(id)
    .then(
        function (resultado) {
            res.json(resultado);
        }
    ).catch(
        function (erro) {
            console.log(erro);
            console.log(
                "\nHouve um erro ao realizar o exibirpontos! Erro: ",
                erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        }
    );
}


module.exports = {
    exibirpontos
}
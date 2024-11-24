function exibirpontos() {
var id = sessionStorage.ID_USUARIO;

    fetch(`/graficos/exibirpontos/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO entrar()!")

        if (resposta.ok) {
            console.log(resposta);

            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));
                sessionStorage.PONTOSQUIZ = json[0].pontosquiz; 

            });

        } else {

            console.log("Houve um erro ao tentar realizar o login!");

            resposta.text().then(texto => {
                console.error(texto);
                // finalizarAguardar(texto);
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
}
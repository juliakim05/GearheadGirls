// const { text } = require("express")

const $startGameButton = document.querySelector(".start-quiz") //cifrao pra indicar que a variavel ja existe no html
const $questionsContainer = document.querySelector(".questions-container")
const $answersContainer = document.querySelector(".answers-container")
const $questionText = document.querySelector(".question")
const $nextQuestionButton = document.querySelector(".next-question")

//const não permite reatribuição de valores, let permite
$startGameButton.addEventListener("click", startGame) //captura o evento de clique
$nextQuestionButton.addEventListener("click", displayNextQuestion) //quando o usuario clicar no botao proxima pergunta, vai pra proxima da lista de questions

let currentQuestionQuiz = 0
var totalAcerto = 0

function startGame() {
    $startGameButton.classList.add("hide") //adicionando class
    $questionsContainer.classList.remove("hide") //removendo class
    displayNextQuestion()
}

//enquanto minha div tiver filho vamos removendo
function displayNextQuestion() {
   resetState();

   if (questions.length == currentQuestionQuiz) { //verificando o tamanho da questao é igual a pergunta atual
   return finishGame();
   }



    $questionText.textContent = questions[currentQuestionQuiz].question
        questions[currentQuestionQuiz].answers.forEach(answer =>{
            const newAnswer = document.createElement("button")
        newAnswer.classList.add("button", "answer") //adicionando as duas classes que temos na resposta
        newAnswer.textContent = answer.text

        if (answer.correct) {
            newAnswer.dataset.correct = answer.correct //data atribute variavel com valor no elemento html
        }
        $answersContainer.appendChild(newAnswer)//passe o elemento filho que queremos adicionar
    
    newAnswer.addEventListener("click", selectAnswer) //adicionando um ouvidor de evento, para quando o usuario clicar verificar se é a certa
    })
}

function resetState() {
    while($answersContainer.firstChild){ //verificando se o answers container tem filhos
        $answersContainer.removeChild($answersContainer.firstChild)
        }
    
       

    document.body.removeAttribute("class") //removendo todas as classes que o body possa ter
    $nextQuestionButton.classList.add ("hide")
}

//verificando se a resposta é certa e dando estilização de cor
function selectAnswer(event) {
const answerClicked = event.target

if (answerClicked.dataset.correct) {
    totalAcerto++
}

document.querySelectorAll(".answer").forEach(button => {
    if (button.dataset.correct) {
        button.classList.add("correct")
    } else {
        button.classList.add("incorrect")
    }
    
    button.disabled = true; //bloqueando botoes depois do usuario ter selecionado uma
})

$nextQuestionButton.classList.remove("hide")
currentQuestionQuiz++
}

var ctx = document.getElementById('myChart1')

function finishGame() {
    const totalQuestion = questions.length
    const performance = Math.floor(totalAcerto * 100 / totalQuestion)

    let message = ""

    switch (true){
        case (performance >= 90):
            message = "Uma Gearhead Raiz!"
            break
        case (performance >= 70):
            message = "Você está crescendo!"
            break
        case(performance >= 50):
            message = "Tá ficando boa!"
            break
        default:
            message = "Récem-nascida no mundo Gearhead!"
    }

    $questionsContainer.innerHTML = 
    `
  
    <p class="final-message">
        Você acertou ${totalAcerto} de ${totalQuestion} questões!
        <span>Resultado: ${message}</span>
    </p>
    
<button onclick="window.location.reload()" class="button">
    Refazer teste
    </button>

      
    `
    sessionStorage.TOTAL_ACERTOS = totalAcerto;
    alert(`${sessionStorage.TOTAL_ACERTOS}`)
    pontuar();

    div_grafico.style.display = "flex"

new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['certas', 'erradas'],
        datasets: [{
            label: '# of Votes',
            data: [currentQuestionQuiz - totalAcerto, totalAcerto],
            borderWidth: 1
        }]
    },
    options: {
    indexAxis: 'y',
}
})
}

var total_erros = currentQuestionQuiz - totalAcerto;
var total_pontos = sessionStorage.PONTOSQUIZ


currentQuestionQuiz = 0
totalAcerto = 0


    
/*Fim do quiz*/



   

    function pontuar() {
        // aguardar();
    
        //Recupere o valor da nova input pelo nome do id
        // Agora vá para o método fetch logo abaixo
    
        var pontosVar = totalAcerto;
        var idVar = sessionStorage.ID_USUARIO;
    
        // Enviando o valor da nova input
        fetch(`/usuarios/pontuar/${idVar}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                // crie um atributo que recebe o valor recuperado aqui
                // Agora vá para o arquivo routes/usuario.js
                idServer: idVar,
                pontosServer: pontosVar
            }),
        })
            .then(function (resposta) {
                console.log("resposta: ", resposta);
    
                if (resposta.ok) {
                    
                } else {
                    throw "Houve um erro ao tentar realizar a pontuação!";
                }
            })
            .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
                // finalizarAguardar();
            });
    
        return false;
    }
//Math.floor arrendonda












//array cada posição é um objeto com as possiveís respostas
var questions = [
    {
        question: "O que significa o termo 'Gearhead'?",
        answers: [
            {text: "Coração de motor", correct: false},
            {text: "Cabeça de engrenagem", correct: true},
            {text: "Cabeça de caminhão", correct: false},
            {text: "Amar carros", correct: false}
        ]
    },
    {
        question: "Qual é o nome do carro que ficou famoso por suas aparições nos filmes 'De volta para o futuro'?",
        answers: [
            {text: "Dodge Charger", correct: false},
            {text: "Ford Mustang", correct: false},
            {text: "Chevrolet Camaro", correct: false},
            {text: "DeLorean", correct: true}
        ]
    },
    {
        question: "Em um carro de drift, qual é a principal modificação feita no sistema de suspensão'?",
        answers: [
            {text: "Suspensão com mais flexibilidade", correct: true},
            {text: "Suspensão mais rígida", correct: false},
            {text: "Sistema de controle de tração", correct: false},
            {text: "Suspensão elevada", correct: false}
        ]
    },
    {
        question: "Quem foi a primeira mulher a pilotar na fórmula 1?",
        answers: [
            {text: "Danica Patrick", correct: false},
            {text: "Susie Wolf", correct: true},
            {text: "Maria Teresa de Filippis", correct: false},
            {text: "Shirley Muldowney", correct: false}
        ]
    },
    {
        question: "Em 2021, quem se tornou a primeira mulher a vencer o Campeonato Mundial de Rally?",
        answers: [
            {text: "Jutta Kleinschmid", correct: true},
            {text: "Michelle Mouton", correct: false},
            {text: "Mikka Hirvonen", correct: false},
            {text: "Laia Sanz", correct: false}
        ]
    },
    {
        question: "Qual tipo de carroceria é mais comumente usada por entusiastas de carros modificados para corridas de rua?",
        answers: [
            {text: "Coupe", correct: false},
            {text: "Cabriolet", correct: false},
            {text: "Sedan", correct: false},
            {text: "Hatchback", correct: true}
        ]
    },
    {
        question: "Qual é a função do turbo em um motor de carro?",
        answers: [
            {text: "Melhorar a eficiência do combustível", correct: false},
            {text: " Reduzir a temperatura do motor", correct: false},
            {text: "Aumentar a potência do motor", correct: true},
            {text: "Melhorar o sistema de escape", correct: false}
        ]
    },
    {
        question: "Qual termo descreve a modificação de um carro para melhorar seu desempenho ou aparência estética?",
        answers: [
            {text: "Car Wrapping", correct: false},
            {text: "Tuning", correct: true},
            {text: "Drifting", correct: false},
            {text: "Off-roading", correct: false}
        ]
    },
    {
        question: "Quem foi a primeira mulher a trabalhar como engenheira-chefe na Fórmula 1?",
        answers: [
            {text: "Monisha Kaltenborn", correct: false},
            {text: "Maria Teresa de Filippis", correct: false},
            {text: "Claire Williams", correct: true},
            {text: "Susie Wolf", correct: false}
        ]
    },
    {
        question: "Qual foi o primeiro carro fabricado no mundo?",
        answers: [
            {text: "Benz Patent-Motorwagen", correct: true},
            {text: "Ford Model T", correct: false},
            {text: "Chevrolet Corvette", correct: false},
            {text: " Volkswagen Fusca", correct: false}
        ]
    },


]
var btn = document.getElementById("play");
var player1 = document.getElementById("player1");
var player2 = document.getElementById("player2");
var result = document.getElementById("result");

function getPlayerResult() {
    return Math.floor((Math.random() * 3) + 1);
}

function getNameById(num) {
    return (num === 1) ? 'Камень' : (num === 2) ? 'Ножници' : 'Бумага';
}

function runGame() {
    let rndmNumber1 = getPlayerResult(),
        rndmNumber2 = getPlayerResult();
    player1.innerHTML = getNameById(rndmNumber1);
    player2.innerHTML = getNameById(rndmNumber2);
    printResult(determineWinner(rndmNumber1, rndmNumber2));
}

function determineWinner(player1, player2) {
    return (player1 === player2) ? player1 = null : ((player1 - player2) === -1) || ((player1 - player2) === 2) ? player1 = 1 : player2 = 2;
}

function printResult(res) {
    if (res === 1) res = "Выиграл первый игрок";
    if (res === 2) res = "Выиграл второй игрок";
    if (res === null) res = "Ничья, попробуйте еще раз";
    result.innerHTML = res;
}

btn.addEventListener("click", runGame);
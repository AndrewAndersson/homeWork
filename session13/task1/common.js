"use strict";
(function run() {
    var diceId = document.getElementById('firstDice');
    let result;

    function getRndNumber() {
        let first,
            second;
        let result = '';
        let totalResult = 0;
        for (let i = 1; i <= 15; i++) {
            if (i == 8 || i == 13) continue;
            first = Math.floor((Math.random() * 6) + 1);
            second = Math.floor((Math.random() * 6) + 1);
            result += "Первая кость: " + first + " " + "Вторая кость: " + second + "<br>" + isNumbersEqual(first, second) + isBigDifference(first, second);
            totalResult += first + second;
        }
        return () => result + total(totalResult);
    }
    result = getRndNumber();

    function isNumbersEqual(dice1, dice2) {
        return (dice1 === dice2) ? "Выпал Дубль:" + " " + dice1 + "<br>" : "";
    }

    function isBigDifference(dice1, dice2) {
        let res = "";
        return ((dice1 < 3 && dice2 > 4) || (dice1 > 4 && dice2 < 3)) ? res += "Большой разброс между костями. Разница составляет: " + Math.abs(dice2 - dice1) + "<br>" : "";
    }

    function total(sum) {
        return (sum >= 100) ? "<br />Победа, вы набрали" + " " + sum + " " + "очков" : "<br />Вы проиграли, у вас" + " " + sum + " " + "очков";
    }

    function setResult(res) {
        return () => diceId.innerHTML += res;
    }

    result = setResult(result());
    result();
}());
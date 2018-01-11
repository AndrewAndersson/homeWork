(function() {
    let selectCheck = document.getElementById('selectCheck'),
        deselectCheck = document.getElementById('deselectCheck');

    function removeSelect() {
        let elements = document.querySelectorAll('input');
        for (let i = 0; i < elements.length; i++) {
            elements[i].removeAttribute('checked');
        }
    }
    deselectCheck.addEventListener("click", removeSelect);

    function addSelect() {
        let elements = document.querySelectorAll('input');
        for (let i = 0; i < elements.length; i++) {
            elements[i].setAttribute('checked', 'true');
        }
    }
    selectCheck.addEventListener("click", addSelect);
}());
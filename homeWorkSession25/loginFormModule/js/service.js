'use strict';
const autorizationLogin = (function() {
    let signIn = document.getElementById('btn'),
        inputLogin = document.getElementById('inputEmail'),
        inputPass = document.getElementById('inputPassword'),
        alertMsg = document.querySelector('.alert'),
        formSingin = document.querySelector('.form-signin'),
        mainContant = document.querySelector('.contant');

    function setLogAndPass(el) {
        el.forEach(item => {
            localStorage.setItem('login', item.login);
            localStorage.setItem('pass', item.password);
        });
    }

    function alertMessage(textMsg) {
        alertMsg.classList.add('show');
        alertMsg.innerHTML = textMsg;
    }

    function checkForEmptyLogin() {
        let isValid = false;
        if (inputLogin.value === '') {
            alertMessage('Поля не могут быть пустые! Заполните поля');
            isValid;
        } else {
            isValid = true;
        }
        return isValid;
    }

    function checkForEmptyPass() {
        let isValid = false;
        if (inputPass.value == '') {
            alertMessage('Поля не могут быть пустые! Заполните поля');
            return isValid;
        } else {
            return isValid = true;
        }
    }

    function isLoginCorrect(val1, val2) {
        let regExp = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
        let isValid = false;
        val1 && val2 && (!regExp.test(inputLogin.value) ? alertMessage('Не коректно указан логин!') : isValid = true);
        return isValid;
    }

    function isCorecctLogAndPass(isValid) {
        if (isValid) {
            let login = localStorage.getItem('login'),
                pass = localStorage.getItem('pass');
            switch ((inputLogin.value === login) && (inputPass.value === pass)) {
                case true:
                    alertMsg.classList.remove('show');
                    formSingin.classList.add('hide');
                    return true;
                    break;

                default:
                    alertMessage('Не верный логин или пароль');
                    return false;
                    break;
            };

        }
    }

    function getAuthorized(val) {
        if (val) {
            mainContant.classList.remove('hide');
            document.getElementById('otputEmail').value = localStorage.getItem('login');
            document.getElementById('otputPassword').value = setOutputPassMapping();
        }
    }

    function setOutputPassMapping() {
        let pass = localStorage.getItem('pass');
        let res = "*".repeat(pass.length);
        return res;
    }

    function clickSignIn(event) {
        let isValidLogin = isLoginCorrect(checkForEmptyLogin(), checkForEmptyPass()),
            isLoget = isCorecctLogAndPass(isValidLogin);
        getAuthorized(isLoget);
    }

    function comeBackFunction(e) {
        let bntClick = e.target.id;
        if (bntClick === 'btnComeBack') {
            mainContant.classList.add('hide');
            formSingin.classList.remove('hide');
        }
    }

    function setShowHidePass(e) {
        if (e.target.id === 'btnHideShow') {
            e.target.innerHTML = 'Показать пароль';
            document.getElementById('otputPassword').value = setOutputPassMapping();
            e.target.setAttribute('id', 'btnHide');
        } else if (e.target.id === 'btnHide') {
            e.target.innerHTML = 'Скрыть пароль';
            document.getElementById('otputPassword').value = localStorage.getItem('pass');
            e.target.setAttribute('id', 'btnHideShow');
        }

    }

    function ifButtonClicked(event) {
        (event.target.id === 'btnComeBack' ? comeBackFunction(event) : setShowHidePass(event));
    }

    function initComponent() {
        signIn.addEventListener("click", clickSignIn);
        mainContant.addEventListener("click", ifButtonClicked);
    }

    return {
        setLogAndPass: setLogAndPass,
        initComponent: initComponent
    }

})();
autorizationLogin.setLogAndPass(data);
autorizationLogin.initComponent();
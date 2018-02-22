'use strict';
(function() {
    const autorizationLogin = (function() {
        let signIn = document.getElementById('btn'),
            inputLogin = document.getElementById('inputEmail'),
            inputPass = document.getElementById('inputPassword'),
            alertMsg = document.querySelector('.alert'),
            formSingin = document.querySelector('.form-signin'),
            mainContant = document.querySelector('.contant');

        function setLogAndPass(el) {
            el.forEach(item => {
                localStorage.setItem('log', item.login);
                localStorage.setItem('pass', item.password);
            });
        }

        function alertMessage(textMsg) {
            alertMsg.classList.add('show');
            alertMsg.innerHTML = textMsg;
        }

        function checkForEmptyLogin() {
            let isValid = true,
                testMail = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
            if (inputLogin.value == '') {
                alertMessage('Поля не могут быть пустые! Заполните поля');
                return isValid = false;
            } else if (!testMail.test(inputLogin.value)) {
                alertMessage('Не коректно указан логин!')
                return isValid = false;
            } else {
                alertMsg.classList.remove('show');
                return isValid;
            }
        }

        function checkForEmptyPass() {
            let isValid = true;
            if (inputPass.value == '') {
                alertMessage('Поля не могут быть пустые! Заполните поля');
                return isValid = false;
            } else return isValid;
        }

        function isCorecctLogAndPass(value1, value2) {
            let log = localStorage.getItem('log'),
                pass = localStorage.getItem('pass');
            let auch = true;
            if (value1 && value2) {
                switch ((inputLogin.value === log) && (inputPass.value === pass)) {
                    case true:
                        alertMsg.classList.remove('show');
                        formSingin.classList.add('hide');
                        return auch;
                        break;

                    default:
                        alertMessage('Не верный логин или пароль');
                        return auch = false;
                        break;
                };

            }
        }

        function getAuthorized(val) {
            if (val) {
                let controlPanel = document.createElement('div');
                controlPanel.setAttribute("class", "control-panel");
                controlPanel.innerHTML = `<h1 class="h3 font-weight-normal control-panel__title">Информация о пользователе</h1>\
                                        <div class="fields-input">\
                                            <div class="item">\
                                                <p class="input-title">Логин</p>\
                                                <input type="text" id="otputEmail" class="form-control" placeholder="Email address" required="" autofocus="" autocomplete="off">\
                                            </div>\
                                            <div class="item">\
                                                <p class="input-title">Пароль</p>\
                                                <input type="text" id="otputPassword" class="form-control" placeholder="Password" required="" autocomplete="off">\
                                                <button id="btnHide" class="btn btn-lg btn-primary btn-block" type="submit">Показать пароль</button>\
                                            </div>\
                                        </div>\
                                        <button id="btnComeBack" class="btn btn-lg btn-primary btn-block" type="submit">Вернуться назад</button>`
                mainContant.appendChild(controlPanel);
                document.getElementById('otputEmail').value = localStorage.getItem('log');
                document.getElementById('otputPassword').value = setOutputPassMapping();
            }
        }

        function clickSignIn(event) {
            let isEmptyLogin = checkForEmptyLogin(),
                isEmptyPass = checkForEmptyPass();
            let isLoget = isCorecctLogAndPass(isEmptyLogin, isEmptyPass);
            getAuthorized(isLoget);
            event.preventDefault();
        }

        function comeBackFunction(e) {
            let bntClick = e.target.id,
                parent = e.target.parentElement.parentElement;
            if (bntClick === 'btnComeBack') {
                parent.removeChild(e.target.parentElement);
                formSingin.classList.remove('hide');
            }
        }

        function setOutputPassMapping() {
            let pass = localStorage.getItem('pass');
            let res = '';
            for (let i = 0; i <= pass.length; i++) {
                res += '*';
            }
            return res;
        }

        function setShowHidePass(event) {
            if (event.target.id === 'btnHideShow') {
                event.target.innerHTML = 'Показать пароль';
                document.getElementById('otputPassword').value = setOutputPassMapping();
                event.target.setAttribute('id', 'btnHide');
            } else if (event.target.id === 'btnHide') {
                event.target.innerHTML = 'Скрыть пароль';
                document.getElementById('otputPassword').value = localStorage.getItem('pass');
                event.target.setAttribute('id', 'btnHideShow');
            }

        }

        function initComponent() {
            signIn.addEventListener("click", clickSignIn);
            mainContant.addEventListener("click", comeBackFunction);
            mainContant.addEventListener("click", setShowHidePass);
        }

        return {
            setLogAndPass: setLogAndPass,
            initComponent: initComponent
        }

    })();
    autorizationLogin.setLogAndPass(data);
    autorizationLogin.initComponent();
}());
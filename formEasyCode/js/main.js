class BasicList {
    constructor() {
        this.logInForm = document.querySelector('.log-in');
        this.logInEmail = document.querySelector('.log-in__form_email');
        this.logInPassword = document.querySelector('.log-in__form_password');
        this.logInBtn = document.querySelector('.log-in__btn');
        this.toSignInBtn = document.querySelector('.to-sign-in');
        this.toLogInBtn = document.querySelector('.to-log-in');
        this.logAlert = document.querySelector('.log-in__alert');

        this.fields = document.querySelectorAll('.form-control');

        this.signForm = document.querySelector('.sign-in');
        this.signInBtn = document.querySelector('.sign-in__btn');

        this.signAlert = document.querySelector('.sign-in__alert');

        this.userName = document.querySelector('.user-name');
    }

    setLocation(local = location.href) {
        this.urlLocal = local.substring(local.indexOf('#'), local.length + 1);
        if (local.indexOf('#') === (-1)) {
            location.href = '#logIn'
            this.logInForm.classList.remove('hide');
            this.signForm.classList.add('hide');
        }
        if ((this.urlLocal === '#logIn') || (local === '#logIn')) {
            location.href = '#logIn';
            this.logInForm.classList.remove('hide');
            this.signForm.classList.add('hide');
        }
        if ((this.urlLocal === '#signIn') || (local === '#signIn')) {
            location.href = '#signIn';
            this.signForm.classList.remove('hide');
            this.logInForm.classList.add('hide');
        }
        if ((this.urlLocal === '#home') || (local === '#home')) {
            location.href = '#home';
            this.signForm.classList.add('hide');
            this.logInForm.classList.add('hide');
        }
    }
    getAlertMessage(message, link) {
        link.classList.add('show');
        link.innerHTML = `<p>${message}</p>`;
    }
    removeAlertMessage(link) {
        link.classList.remove('show');
    }
    isFieldsEmpty() {
        let fieldEmpty = false;
        this.fields.forEach((item, index, arr) => {
            if ((arr[0].value == '') || (arr[1].value == '') && (this.urlLocal === '#logIn')) {
                this.getAlertMessage('fields could not be empty', this.logAlert);
            } else {
                this.removeAlertMessage(this.logAlert);
                fieldEmpty = true;
            }

            if ((arr[2].value == '') || (arr[3].value == '') || (arr[4].value == '') || (arr[5].value == '') && (this.urlLocal === '#signIn')) {
                this.getAlertMessage('fields could not be empty', this.signAlert);
            } else {
                this.removeAlertMessage(this.signAlert);
                fieldEmpty = true;
            }
        })
        return fieldEmpty;
    }

    initSignInForm() {
        this.signInBtn.addEventListener('click', (event) => {
            event.preventDefault();
            this.isFieldsEmpty();
        })
    }
    getSignForm() {
        this.toSignInBtn.addEventListener('click', (event) => {
            event.preventDefault();
            location.reload();
            this.setLocation('#signIn');
        })
        this.toLogInBtn.addEventListener('click', (event) => {
            event.preventDefault();
            location.reload();
            this.setLocation('#logIn');
        })
    }
    initComponents() {
        this.initSignInForm();
        this.getSignForm();
        this.setLocation();
    }

}

let basicList = new BasicList();
basicList.initComponents();

class LogInForm extends BasicList {
    constructor() {
        super();
    }

    isLoginCorrect(val) {
        let regExp = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
        let isValid = false;
        val && (!regExp.test(this.logInEmail.value) ? this.getAlertMessage('not correct email address!', this.logAlert) : isValid = true);
        return isValid;
    }
    isPasswordCorrect(val1, val2) {
        let regExp = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
        let isValid = false;
        val1 && val2 && (!regExp.test(this.logInPassword.value) ? this.getAlertMessage('not correct pass', this.logAlert) : isValid = true);
        return isValid;
    }
    getLogAndPass(val) {
        return val && {
            email: this.logInEmail.value,
            password: this.logInPassword.value
        }
    }
    getUserName(data) {
        const url = 'https://easycode-test-auth-server.herokuapp.com/verify';
        const json = JSON.stringify({
            token: data
        });

        const xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xhr.onload = () => {
            const response = xhr.responseText;
            if (xhr.readyState == 4 && xhr.status == "200") {
                this.setLocation('#home');
                this.userName.classList.remove('hide');
                this.userName.innerHTML = `<h2>User Name: ${response}</h2>`;
            } else {
                this.getAlertMessage(response, this.logAlert)
            }
        };
        xhr.send(json);
    }
    sendLogin(data) {
        const url = 'https://easycode-test-auth-server.herokuapp.com/login';
        const json = JSON.stringify(data);

        const xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xhr.onload = () => {
            const response = xhr.responseText;
            if (xhr.readyState == 4 && xhr.status == "200") {
                this.getUserName(response)
            } else {
                this.getAlertMessage(response, this.logAlert)
            }
        };
        xhr.send(json);
    }
    isSend(passCorrect) {
        if (this.getLogAndPass(passCorrect) != false) {
            this.sendLogin(this.getLogAndPass(passCorrect));
        }
    }

    initLogInForm() {
        this.logInBtn.addEventListener('click', (event) => {
            event.preventDefault();
            let passCorrect = this.isPasswordCorrect(this.isFieldsEmpty(), this.isLoginCorrect(this.isFieldsEmpty()));
            this.isSend(passCorrect);
        })
    }
    initComponents() {
        this.initLogInForm();
        this.setLocation();
    }
}

let logInForm = new LogInForm();
logInForm.initComponents();
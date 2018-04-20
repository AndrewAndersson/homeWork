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
        this.signInName = document.querySelector('.sign-in__form_name');
        this.signInEmail = document.querySelector('.sign-in__form_email');
        this.signInPassword = document.querySelector('.sign-in__form_password');
        this.signInConfirmPassword = document.querySelector('.sign-in__form_confirm-password');
        this.signInBtn = document.querySelector('.sign-in__btn');

        this.signAlert = document.querySelector('.sign-in__alert');

        this.userName = document.querySelector('.user-name');
        this.logOut = document.querySelector('.log-out');

        this.backBtn = document.querySelector('.back-btn');
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
                this.logOut.classList.remove('hide');
                this.userName.classList.remove('hide');
                this.userName.innerHTML += `<h2 class="user-title">User Name: ${response}</h2>`;
                this.getTasks();
            } else {
                this.getAlertMessage(response, this.logAlert)
            }
        };
        xhr.send(json);
    }
    sendLogin(data, url) {
        const json = JSON.stringify(data);

        const xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xhr.onload = () => {
            const response = xhr.responseText;
            if (xhr.readyState == 4 && xhr.status == "200") {
                this.getUserName(response);
                localStorage.setItem('auth', response);
            } else {
                this.getAlertMessage(response, this.logAlert)
            }
        };
        xhr.send(json);
    }

    getDate(item) {
        return moment(item).format('YYYY/MM/DD, HH:mm');
    }

    getTasksOnPage(data) {
        this.userName.innerHTML += data.map(item => {
            let tasks = `<div class="col-md-12"><ul>
                            <li class="tasks__item">
                                <p>ID: ${item._id}</p>
                                <p>Title: ${item.title}</p>
                                <p>Description: ${item.description}</p>
                                <p>Date: ${this.getDate(item.date)}</p>
                            </li>
                        </div></ul>`;
            return tasks;
        }).join('');
    }

    getTasks() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://easycode-test-auth-server.herokuapp.com/tasks', true);

        xhr.onload = () => {
            if (xhr.readyState === 4 && +xhr.status === 200) {
                this.getTasksOnPage(JSON.parse(xhr.responseText));
            }
        };

        xhr.onerror = function() {
            console.log('Error!');
        };

        xhr.send();
    }

    isSend(passCorrect) {
        const url = 'https://easycode-test-auth-server.herokuapp.com/login';
        if (this.getLogAndPass(passCorrect) != false) {
            this.sendLogin(this.getLogAndPass(passCorrect), url);
        }
    }

    getAuth() {
        let auth = localStorage.getItem('auth');
        ((auth === null) ? this.setLocation('#logIn') : this.getUserName(auth));
    }

    getSignForm() {
        this.toSignInBtn.addEventListener('click', (event) => {
            event.preventDefault();
            //location.reload();
            this.setLocation('#signIn');
        })
        this.toLogInBtn.addEventListener('click', (event) => {
            event.preventDefault();
            //location.reload();
            this.setLocation('#logIn');
        })
    }

    getStartPage() {
        this.backBtn.addEventListener('click', () => {
            this.logOut.classList.add('hide');
            this.userName.classList.add('hide');
            localStorage.clear();
            this.setLocation('#logIn');
        })

    }

    initComponents() {
        this.getStartPage();
        this.getSignForm();
        this.getAuth();
    }

}

let basicList = new BasicList();
basicList.initComponents();

class LogInForm extends BasicList {
    constructor() {
        super();
    }

    isLoginCorrect(val, loginValue, alertLoc) {
        let regExp = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
        let isValid = false;
        val && (!regExp.test(loginValue) ? this.getAlertMessage('not correct email address!', alertLoc) : isValid = true);
        return isValid;
    }
    isPasswordCorrect(val1, val2, passwordValue, alertLoc) {
        let regExp = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
        let isValid = false;
        val1 && val2 && (!regExp.test(passwordValue) ? this.getAlertMessage('not correct pass', alertLoc) : isValid = true);
        return isValid;
    }

    getLogAndPass(val) {
        return val && {
            email: this.logInEmail.value,
            password: this.logInPassword.value
        }
    }

    initLogInForm() {
        this.logInBtn.addEventListener('click', (event) => {
            event.preventDefault();
            let passCorrect = this.isPasswordCorrect(this.isFieldsEmpty(), this.isLoginCorrect(this.isFieldsEmpty(), this.logInEmail.value, this.logAlert), this.logInPassword.value, this.logAlert);
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

class SignInForm extends LogInForm {
    constructor() {
        super();
    }

    isNameValid(val1, alertLoc) {
        let regExp = /^[a-zA-Z]{3,16}$/;
        let isValid = false;
        val1 && (!regExp.test(this.signInName.value) ? this.getAlertMessage('Not correct name. The correct length of the name is from 3 to 16 letters', alertLoc) : isValid = true);
        return isValid;
    }

    isPasswordConformity(passCorrect) {
        let isValid = false;

        if ((passCorrect === true) && (this.signInPassword.value === this.signInConfirmPassword.value)) {
            isValid = true;
        } else if ((passCorrect === true) && (this.signInPassword.value !== this.signInConfirmPassword.value)) {
            this.getAlertMessage('entered passwords do not match', this.signAlert);
        }
        return isValid;
    }

    getNewUser(val) {
        return val && {
            email: this.signInEmail.value,
            name: this.signInName.value,
            password: this.signInPassword.value
        }
    }

    isSendUser(passCorrect) {
        const url = 'https://easycode-test-auth-server.herokuapp.com/signup';
        if (this.getNewUser(passCorrect) != false) {
            this.sendLogin(this.getNewUser(passCorrect), url);
        }
    }

    initSignInForm() {
        this.signInBtn.addEventListener('click', (event) => {
            event.preventDefault();
            let passCorrect = this.isPasswordCorrect(this.isFieldsEmpty(), this.isLoginCorrect(this.isNameValid(this.isFieldsEmpty(), this.signAlert), this.signInEmail.value, this.signAlert), this.signInPassword.value, this.signAlert);
            this.isSendUser(this.isPasswordConformity(passCorrect));
        })
    }

    initComponents() {
        this.initSignInForm();
        this.setLocation();
    }
}

let signInForm = new SignInForm();
signInForm.initComponents();
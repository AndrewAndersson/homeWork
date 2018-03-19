'use strict';
(function() {
    let btnTop = document.querySelector(".show-hide-top__btn"),
        btnBottom = document.querySelector(".show-hide-bottom__btn"),
        contactList = document.querySelector(".main-contant__contact-list"),
        containerBtnTop = document.querySelector(".show-hide-top"),
        containerBtnBottom = document.querySelector(".show-hide-bottom"),
        chatList = document.querySelector(".main-contant__chat"),
        inputMessege = document.getElementById("input-messege"),
        searchInput = document.querySelector(".main-contant__contact-list__search__input"),
        contacts = document.querySelector(".main-contant__contact-list__contacts"),
        sendMessege = document.querySelector(".main-contant__chat__input-messege__send"),
        chatText = document.querySelector(".main-contant__chat__text");

    function showContactList() {
        contactList.classList.add('show');
        contactList.classList.remove('hide');
        chatList.classList.remove('show');
        chatList.classList.add('hide');
        containerBtnTop.classList.remove('show');
        containerBtnBottom.classList.add('show');

    }

    function showChatList() {
        contactList.classList.remove('show');
        contactList.classList.add('hide');
        chatList.classList.add('show');
        chatList.classList.remove('hide');
        containerBtnTop.classList.add('show');
        containerBtnBottom.classList.remove('show');
    }

    function inputClear() {
        inputMessege.setAttribute('value', '');
    }

    function searchClear() {
        searchInput.setAttribute('value', '');
    }

    function getContacts() {
        let newArr = [];
        data.forEach((item) => {
            if (item.status != "admin") {
                newArr.push({
                    name: item.name,
                    photo: item.photo,
                    id: item.id
                });
            }
        });
        return newArr;
    }
    let outputContacts = getContacts();

    function addContacts(arr) {
        return arr.forEach(item => {
            contacts.innerHTML += `<div class = "main-contant__contact-list__contacts__user">
                                    <img class = "main-contant__contact-list__contacts__user__photo" src="${item.photo}" alt="${item.name}">
                                    <p class = "main-contant__contact-list__contacts__user__name">${item.name}</p></div>`
        })
    }
    addContacts(outputContacts);

    function isSelected(arr, clickedElement) {
        arr.forEach((item, index) => {
            if (clickedElement == item) {
                localStorage.setItem('selected', index + 1);
            }
        })
    }

    function setSelect(arr) {
        let isActive = localStorage.getItem('selected');
        return arr.forEach((item, index) => {
            if ((isActive - 1) !== index) {
                item.classList.remove('selected');
            }
            if ((isActive - 1) === index) {
                item.classList.add('selected');
            }
        })
    }

    function selectContact(e) {
        let activeElement = e.target.parentElement,
            contactUsers = document.querySelectorAll(".main-contant__contact-list__contacts__user");
        isSelected(contactUsers, activeElement);
        setSelect(contactUsers);
    }

    function getAdmin() {
        let newArr = [];
        data.forEach((item) => {
            if (item.status === "admin") {
                newArr.push({
                    photo: item.photo
                });
            }
        });
        return newArr;
    }

    function getMessege(arr) {
        return arr.forEach(item => {
            if (inputMessege.getAttribute('value') !== 'Click here to write something') {
                chatText.innerHTML += `<div class = "main-contant__chat__text__messege">
                                            <div class="main-contant__chat__text__messege__comment"> 
                                                ${inputMessege.value}
                                            </div>
                                            <div id = "triangle-right"></div>
                                            <img class = "main-contant__chat__text__image" src="${item.photo}">
                                        </div>`
                inputMessege.value = '';

            }
        })
    }

    function getBotMessege(selected) {
        return data.forEach((item, index) => {
            if ((index == selected) && (index === 1)) {
                chatText.innerHTML += `<div class = "main-contant__chat__text__bot-messege">
                                            <img class = "main-contant__chat__text__image" src="${item.photo}">
                                            <div id = "triangle-left"></div>
                                            <div class="main-contant__chat__text__bot-messege__comment"> 
                                                I am Groot
                                            </div>
                                        </div>`
                inputMessege.value = '';
            } else if ((index == selected) && (index !== 1)) {
                chatText.innerHTML += `<div class = "main-contant__chat__text__bot-messege">
                                            <img class = "main-contant__chat__text__image" src="${item.photo}">
                                            <div id = "triangle-left"></div>
                                            <div class="main-contant__chat__text__bot-messege__comment"> 
                                                Hello my name is ${item.name}
                                            </div>
                                        </div>`
                inputMessege.value = '';
            }

        })
    }

    function initMessege() {
        let selected = localStorage.getItem('selected'),
            admin = getAdmin();
        getMessege(admin);
        setTimeout(function() { getBotMessege(selected); }, 2000)
    }
    sendMessege.addEventListener('click', initMessege);
    contacts.addEventListener('click', selectContact);
    inputMessege.addEventListener('click', inputClear);
    searchInput.addEventListener('click', searchClear);
    btnTop.addEventListener('click', showContactList);
    btnBottom.addEventListener('click', showChatList);
}());
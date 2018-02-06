'use strict';
(function() {
    let btn = document.getElementById('add'),
        sortSelect = document.getElementById('line-selector'),
        container = document.querySelector('.container'),
        modal = document.querySelector('.modal'),
        btnModal = document.querySelector('#close-modal'),
        removeBtns = document.getElementsByClassName('btn-remove'),
        mainContant = document.querySelector('#mainContant'),
        items = document.getElementsByClassName('item'),
        countText = document.querySelector('#count');

    function getData() {
        let newArr = [];
        data.forEach((item) => {
            newArr.push({
                name: item.name,
                url: item.url,
                description: item.description,
                date: item.date
            });
        });
        return newArr;
    }

    function getName(item) {
        return `${item.name.charAt(0).toUpperCase()}${item.name.substr(1).toLowerCase()}`;
    }

    function getUrl(item) {
        if (item.url.substr(0, 7) === 'http://') {
            return item.url;
        } else return `http://${item.url}`;
    }

    function getDescription(item) {
        if (item.description.length < 15) {
            return item.description;
        } else return `${item.description.substring(0, 15)}...`;
    }

    function getDate(item) {
        return moment(item.date).format('YYYY/MM/DD, HH:mm');
    }

    function setData(arr) {
        return arr.map((item) => {
            return {
                name: getName(item),
                url: getUrl(item),
                description: getDescription(item),
                date: getDate(item)
            };
        });
    }

    function GetSliceArr(arr) {
        let i = items.length,
            ln = arr.length - i,
            x = (arr.length - ln) + 1;
        return arr.slice(i, x);
    }

    function getContant(arr) {
        return arr.forEach((item) => {
            let itemTemplate = document.createElement('div');
            itemTemplate.setAttribute("class", "item")
            itemTemplate.innerHTML = `<div class="col-sm-3 col-xs-6">\
        <img src="${item.url}" alt="${item.name}" class="img-thumbnail">\
        <div class="info-wrapper">\
            <div class="text-muted111">${item.name}</div>\
            <div class="text-muted top-padding">${item.description}</div>\
            <div class="text-muted">${item.date}</div>\
        </div>\
        <button class="btn-remove">Удалить</button>\
        </div>`;
            return mainContant.appendChild(itemTemplate);
        })
    }

    function getModalWindiw() {
        modal.setAttribute('class', 'modalWindow');
        if (items.length < localStorage.getItem('dataLength')) {
            container.firstElementChild.setAttribute('class', 'none');
        }
    }

    function innitModal() {
        btn.classList.add('btn-nonActive');
        btn.addEventListener("click", getModalWindiw);
        btnModal.addEventListener("click", () => {
            modal.removeAttribute('class', 'modalWindow');
            modal.setAttribute('class', 'none');
        });
    }

    function getItemCounter() {
        let count = items.length,
            dataLength = localStorage.getItem('dataLength');
        countText.innerHTML = count;
        if (count >= dataLength) {
            innitModal();
        }
    }

    function removeBlock(e) {
        let parent = e.target.parentElement.parentElement.parentElement;
        for (let btn of removeBtns) {
            if (e.target == btn) {
                parent.removeChild(e.target.parentElement.parentElement);
                getItemCounter();
            }
        }
    }
    mainContant.addEventListener("click", removeBlock);

    function selectMethod(e) {
        let reversed = revesed(),
            sortA = sorFirst();
        if (sortSelect.value == 3) {
            selectMethodInit(reversed);
        }
    }
    sortSelect.addEventListener("click", selectMethod);

    function selectMethodInit(arr) {
        return arr.forEach((item) => {
            return mainContant.appendChild(item);
        })
    }

    function revesed() {
        let newArr = [...items];
        return newArr.reverse();
    }

    function sorFirst() {

    }

    function init() {
        let newData = getData();
        newData = setData(newData);
        localStorage.setItem('dataLength', newData.length);
        let getSL = GetSliceArr(newData);
        getContant(getSL);
        getItemCounter();
    }

    btn.addEventListener("click", init);

})();
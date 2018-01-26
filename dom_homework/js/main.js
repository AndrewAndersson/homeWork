'use strict';
(function() {
    let btn = document.getElementById("play"),
        firstBlock = document.querySelector('#first-line'),
        secondBlock = document.querySelector('#second-line'),
        thirdBlock = document.querySelector('#third-line');

    let selectorBox = document.getElementById('type-selector'),
        slectAmount = document.getElementById('line-selector');

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

    function getDate(item) {
        return moment(item.date).format('YYYY/MM/DD, HH:mm');
    }

    function setData(arr) {
        data = arr.map((item) => {
            return {
                name: getName(item),
                url: item.url, // немогу понять мочему, когда я записую `http://${item.url}` в html коде  в <img src=""/>при втором вызове функции дублируеться http:// и при каждом появляеться плюс одна запись http://
                description: `${item.description.substring(0, 15)}...`,
                date: getDate(item)
            };
        });
        return data;
    }

    function getFirstBlock(arr, container) {
        let newArr = arr.map((item) => {
            let resultHTML = container
                .replace(/\$name/gi, item.name)
                .replace("$url", item.url)
                .replace("$description", item.description)
                .replace("$date", item.date);
            return resultHTML;
        })
        return newArr.join('');
    }

    function getSecondBlock(arr) {
        let newArr = arr.map((item) => {
            let secondItemTemplate = `<div class="col-sm-3 col-xs-6">\
        <img src="http://${item.url}" alt="${item.name}" class="img-thumbnail">\
        <div class="info-wrapper">\
            <div class="text-muted">${item.name}</div>\
            <div class="text-muted top-padding">${item.description}</div>\
            <div class="text-muted">${item.date}</div>\
        </div>\
        </div>`;
            return secondItemTemplate;
        })
        return newArr.join('');
    }

    function getThirdBlock(arr) {
        // let newArr = arr.map((item) => {
        //     let div = document.createElement('div')
        //         .className = "col-sm-3 col-xs-6";

        //     return div.innerHTML = "";
        // })
        // return newArr;
    }

    function selectMethod(data, data2, data3) {
        if (selectorBox.value == 1) {
            removeChildren(secondBlock);
            removeChildren(thirdBlock);
            document.querySelector('.first-group').classList.add("show");
            document.querySelector('.second-group').classList.remove("show");
            document.querySelector('.third-group').classList.remove("show");
            firstBlock.innerHTML = data;
        } else if (selectorBox.value == 2) {
            removeChildren(firstBlock);
            removeChildren(thirdBlock);
            document.querySelector('.second-group').classList.add("show");
            document.querySelector('.first-group').classList.remove("show");
            document.querySelector('.third-group').classList.remove("show");
            secondBlock.innerHTML = data2;
        } else if (selectorBox.value == 3) {
            removeChildren(firstBlock);
            removeChildren(secondBlock);
            document.querySelector('.third-group').classList.add("show");
            document.querySelector('.second-group').classList.remove("show");
            document.querySelector('.first-group').classList.remove("show");
            thirdBlock.innerHTML = data3;
        }
    }

    function sliceArr(arr) {
        let newArr = [];
        if (slectAmount.value == 1) {
            return newArr = arr.slice(0, 3);
        } else if (slectAmount.value == 2) {
            return newArr = arr.slice(0, 6);
        } else return arr;
    }

    function removeChildren(elem) {
        while (elem.lastChild) {
            elem.removeChild(elem.lastChild);
        }
    }

    function init() {
        let newData = getData();
        newData = setData(newData);
        let slicedArr = sliceArr(newData);

        var replaceItemTemplate = '<div class="col-sm-3 col-xs-6">\
    <img src="http://$url" alt="$name" class="img-thumbnail">\
    <div class="info-wrapper">\
    <div class="text-muted">$name</div>\
    <div class="text-muted top-padding">$description</div>\
    <div class="text-muted">$date</div>\
    </div>\
    </div>';
        let firstData = getFirstBlock(slicedArr, replaceItemTemplate);
        let secondData = getSecondBlock(slicedArr);
        let thirdData = getThirdBlock(slicedArr);

        selectMethod(firstData, secondData, thirdData);
    }

    btn.addEventListener("click", init);

})()
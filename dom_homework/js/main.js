'use strict';
(function() {
    let btn = document.getElementById("play"),
        firstBlock = document.querySelector('#first-line'),
        secondBlock = document.querySelector('#second-line'),
        thirdBlock = document.querySelector('#third-line');

    let selectorBox = document.getElementById('type-selector'),
        slectAmount = document.getElementById('line-selector');

    let firstTitleGroup = document.querySelector('.first-group'),
        seocndTitleGroup = document.querySelector('.second-group'),
        thirdTitleGroup = document.querySelector('.third-group');

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

    function showHideContent(...elements) {
        return elements.map((item, index) => {
            if (index === 0) {
                return item.classList.add("show");
            } else return item.classList.remove("show");
        }).join('');
    }

    function selectMethod(data) {
        if (selectorBox.value == 1) {
            showHideContent(firstTitleGroup, seocndTitleGroup, thirdTitleGroup);
            getFirstBlock(data);
        } else if (selectorBox.value == 2) {
            showHideContent(seocndTitleGroup, firstTitleGroup, thirdTitleGroup);
            getSecondBlock(data);
        } else if (selectorBox.value == 3) {
            showHideContent(thirdTitleGroup, seocndTitleGroup, firstTitleGroup);
            getThirdBlock(data);
        }
    }

    function selectionNumberOfElements(arr) {
        let newArr = [];
        if (slectAmount.value == 1) {
            return newArr = arr.slice(0, 3);
        } else if (slectAmount.value == 2) {
            return newArr = arr.slice(0, 6);
        } else return arr;
    }

    function getFirstBlock(arr) {
        firstBlock.innerHTML = arr.map((item) => {
            let resultHTML = setReplaceItemTemplate()
                .replace(/\$name/gi, item.name)
                .replace("$url", item.url)
                .replace("$description", item.description)
                .replace("$date", item.date);
            return resultHTML;
        }).join('');
    }

    function setReplaceItemTemplate() {
        let replaceItemTemplate = '<div class="col-sm-3 col-xs-6">\
        <img src="$url" alt="$name" class="img-thumbnail">\
        <div class="info-wrapper">\
        <div class="text-muted">$name</div>\
        <div class="text-muted top-padding">$description</div>\
        <div class="text-muted">$date</div>\
        </div>\
        </div>';
        return replaceItemTemplate;
    }

    function getSecondBlock(arr) {
        secondBlock.innerHTML = arr.map((item) => {
            let secondItemTemplate = `<div class="col-sm-3 col-xs-6">\
        <img src="${item.url}" alt="${item.name}" class="img-thumbnail">\
        <div class="info-wrapper">\
            <div class="text-muted">${item.name}</div>\
            <div class="text-muted top-padding">${item.description}</div>\
            <div class="text-muted">${item.date}</div>\
        </div>\
        </div>`;
            return secondItemTemplate;
        }).join('');
    }

    function getThirdBlock(arr) {
        return arr.forEach((item) => {
            let div = document.createElement('div'),
                infoWrapper = document.createElement('div');
            let image = document.createElement('img');
            div.className = "col-sm-3 col-xs-6";
            infoWrapper.className = "info-wrapper";
            image.className = "img-thumbnail";
            image.setAttribute("alt", item.name);
            image.setAttribute("src", item.url);

            infoWrapper.innerHTML = '<div class="text-muted">' + item.name + '</div>\
                                    <div class="text-muted top-padding">' + item.description + '</div>\
                                    <div class="text-muted">' + item.date + '</div>';

            div.appendChild(image);
            div.appendChild(infoWrapper);

            thirdBlock.appendChild(div);
        })
    }

    // function removeChildren(elem) {
    //     while (elem.lastChild) {
    //         elem.removeChild(elem.lastChild);
    //     }
    // }

    function init() {

        let newData = getData();
        newData = setData(newData);
        let selectableNumberOfElements = selectionNumberOfElements(newData);

        selectMethod(selectableNumberOfElements);
    }

    btn.addEventListener("click", init);

})();
'use strict';
var btn = document.getElementById("play");

function getSplice(arr) {
    arr.splice(5, 1);
}

function getNewArr(arr) {
    data.forEach((item) => {
        arr.push({
            url: item.url,
            name: item.name,
            params: item.params,
            description: item.description,
            date: item.date
        });
    });
}

function getName(item) {
    return `${item.name.charAt(0).toUpperCase()}${item.name.substr(1).toLowerCase()}`;
}

function getDate(item) {
    return moment(item.date).format('YYYY/MM/DD, HH:mm');
}

function getData(arr) {
    data = arr.map((item) => {
        return {
            name: getName(item),
            url: `http://${item.url}`,
            description: `${item.description.substring(0, 15)}...`,
            date: getDate(item),
            params: `${item.params.status}=>${item.params.progress}`,
            isVisible: item.params.status
        };
    });
}

function getFilter() {
    data = data.filter(item => item.isVisible == true);
    console.log(data);
}

function transform() {
    let newArr = [];

    getSplice(data);

    getNewArr(newArr);

    getData(newArr);

    getFilter();
}

btn.addEventListener("click", transform);
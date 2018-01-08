'use strict';
var btn = document.getElementById("play");

function transform() {
    let newArr = [];

    function getSplice(arr) {
        arr.splice(6, 1);
        return arr;
    }
    getSplice(data);

    data.forEach(function(item, index) {
        newArr.push({
            url: item.url,
            name: item.name,
            params: item.params,
            description: item.description,
            date: index.date
        });
    });

    data = newArr.map(function(item, index) {
        return {
            name: item.name.charAt(0) + item.name.substr(1).toLowerCase(),
            url: `http://${item.url}`,
            description: item.description.substring(0, 15) + "...",
            date: moment(item.date).format('YYYY/MM/DD, h:mm'),
            params: `${item.params.status}=>${item.params.progress}`,
            isVisible: item.params.status
        };
    });

    data = data.filter(item => item.isVisible == true);

    console.log(data);
}

btn.addEventListener("click", transform);
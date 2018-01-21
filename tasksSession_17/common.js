// 1. Из данного массива удалить значение «technics».
//  Все остальное превратить в строку формата «foods, fruits…» 
//  преобразование в строку выполнить с помощью одного метода.
// goods = ['foods', 'fruits', 'technics', 'phones', 'computers']

let goods = ['foods', 'fruits', 'technics', 'phones', 'computers'];

goods.splice(goods.indexOf('technics'), 1);
console.log(`"${goods.join(', ')}"`);

// //////////////////////////////////
// 2. Преобразовать текущую дату и время в понятный человеку формат:
//  08:05 01/01/2018. Используя шаблонные строки.

function getDate() {
    let newDate,
        month;
    newDate = new Date();
    month = newDate.getMonth() + 1;
    (month < 10) ? month = "0" + month: month;
    return `${newDate.getHours()}:${newDate.getMinutes()} ${newDate.getDate()}/${month}/${newDate.getFullYear()}`;
}
console.log(getDate());

//////////////////////////////////////////
// 3. Напишите функцию, которая возвращает расширение файла. 
// Например, getExt(«/home/user/project/script.js») вернет “js”. 
// Функция должна принимать строку

function getExt(str) {
    let charIndex,
        lengthSlice;
    charIndex = str.indexOf('.') + 1;
    lengthSlice = str.length - charIndex;
    return str.substr(charIndex, lengthSlice);
}
console.log(getExt('/home/user/project/script.js'));

//////////////////////////////////
// 4. Напишите функцию, которая удаляет дубликаты из массива. Например, 
// входной массив: [1, 2, 2, 4, 5, 4, 7, 8, 7, 3, 6], 
// массив который возвращает функция [1, 2, 4, 5, 7, 8, 3, 6]

let arr = [1, 2, 2, 4, 5, 4, 7, 8, 7, 3, 6];

function filterArr(array) {
    return array.reduce((a, b) => {
        if (!a.includes(b)) {
            a.push(b);
        }
        return a;
    }, []);
}

console.log(filterArr(arr));
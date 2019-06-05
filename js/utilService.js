'use strict'


function saveToStorage(key, value) {
    var strValue = JSON.stringify(value);
    localStorage.setItem(key, strValue);
}

function loadFromStorage(key) {
    console.log(key);

    return JSON.parse(localStorage.getItem(key))

}


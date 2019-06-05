'use strict'


function onInit() {
    var userPref = {};

    if (loadFromStorage('userPref')) userPref = loadFromStorage('userPref')
    if (!userPref) {
        userPref.bgcColor = 'pink';
        userPref.txtColor = 'blue';
        userPref.date = '01/01/1990'
        userPref.time = '12:12 AM'
    }

    document.body.style.background = userPref.bgcColor;
    document.body.style.color = userPref.txtColor;
    document.querySelector('h2').innerText = userPref.date;
    document.querySelector('h3').innerText = userPref.time;

}



function onSubmit(ev) {
    ev.preventDefault()
    let bgcColor = document.querySelector('.bgc-color').value
    let txtColor = document.querySelector('.txt-color').value
    let date = document.querySelector('.date').value
    let time = document.querySelector('.time').value

    let userPref = { bgcColor: bgcColor, txtColor: txtColor, date: date, time: time }
    setUserPref(userPref)
    saveToStorage('userPref', userPref)
}





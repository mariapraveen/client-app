import { APIURL } from './../Globals';

export function sendRequest(type, name, data, cb, pwd = undefined) {
    let httpRequest = new XMLHttpRequest();
    httpRequest.open(type, `${APIURL}/${name}`, true);
    httpRequest.setRequestHeader('Content-Type', 'plain/text');
    if (pwd) {
        httpRequest.setRequestHeader("Authorization", "Basic " + btoa(pwd));
    }
    httpRequest.addEventListener('readystatechange', () => {
        if (httpRequest.readyState === 4) {
            cb(JSON.parse(httpRequest.responseText));
        }
    })
    httpRequest.send(JSON.stringify(data));
}

export function getDateInfo(time) {
    let date = new Date(time);
    return {
        day: DAY[date.getDay()],
        month: Month[date.getMonth()],
        date: date.getDate(),
        year: date.getFullYear()
    }

}

const DAY = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Month = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
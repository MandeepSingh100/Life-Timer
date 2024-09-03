const settingIconEl = document.getElementById("settingIcon");
const settingContentEl = document.getElementById("settingContent");
const dobEl = document.getElementById("dob");
const dateInputEl = document.getElementById("dateInput");
const initialTextEl = document.getElementById("initialText");
const afterClickEl = document.getElementById("afterClick");

const yearEl = document.getElementById("year");
const monthEl = document.getElementById("month");
const dayEl = document.getElementById("day");
const hourEl = document.getElementById("hour");
const minuteEl = document.getElementById("minute");
const secondEl = document.getElementById("second");

let isIcon = false;
let dateOfBirth;

const toggleContent = () => {
    if(isIcon){
        settingContentEl.classList.add("hide");
    }
    else {
        settingContentEl.classList.remove("hide");
    }
    isIcon = !isIcon;
};

const makeTwoDigitNumber = (number) => {
    return number > 9 ? number: `0${number}`;
};

const updateDob = () => {
    const currentDate = new Date();
    const dateDiff = currentDate - dateOfBirth;
    const year = Math.floor(dateDiff / (1000 * 60 * 60 * 24 * 365));
    const month = Math.floor(dateDiff / (1000 * 60 * 60 * 24 * 365)) % 12;
    const day = Math.floor(dateDiff / (1000 * 60 * 60 * 24)) % 30;
    const hour = Math.floor(dateDiff / (1000 * 60 * 60)) % 24;
    const minute = Math.floor(dateDiff / (1000 * 60)) % 60;
    const second = Math.floor(dateDiff / 1000 ) % 60;

    yearEl.innerHTML = makeTwoDigitNumber(year);
    monthEl.innerHTML = makeTwoDigitNumber(month);
    dayEl.innerHTML = makeTwoDigitNumber(day);
    hourEl.innerHTML = makeTwoDigitNumber(hour);
    minuteEl.innerHTML = makeTwoDigitNumber(minute);
    secondEl.innerHTML = makeTwoDigitNumber(second);
};

const localStorageGetter = () => {
    const year = localStorage.getItem("year");
    const month = localStorage.getItem("month");
    const date = localStorage.getItem("date");
    if(year && month && date ) {
        dateOfBirth = new Date(year, month, date );
    }
    updateDob();
};  

const contentToggler = () => {
    updateDob();
    if(dateOfBirth) {
        initialTextEl.classList.add("hide");
        afterClickEl.classList.remove("hide");

    }
    else {
        initialTextEl.classList.remove("hide");
        afterClickEl.classList.add("hide");
    }
}
const setDobHandler = () => {
    const dateString = dateInputEl.value;
    dateOfBirth = dateString ? new Date(dateString) : null;

    if(dateOfBirth) {
        localStorage.setItem("year", dateOfBirth.getFullYear());
        localStorage.setItem("month", dateOfBirth.getMonth());
        localStorage.setItem("date", dateOfBirth.getDate());
    }
    contentToggler();
    setInterval(() => updateDob(), 1000);
};

localStorageGetter();
contentToggler();
settingIconEl.addEventListener("click", toggleContent);
dobEl.addEventListener("click", setDobHandler);
const hourMinute = document.querySelector('.hour-minute');
const secondsEle = document.querySelector('.seconds-pulse');
const ampmEle = document.querySelector('.am-pm');
const dateYear = document.querySelector('.date-year');

function showTime() {
    const now = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };

    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    const paddedHours = hours.toString().padStart(2, '0');

    hourMinute.textContent = `${paddedHours}:${minutes}`;
    secondsEle.textContent = seconds;
    ampmEle.textContent = ampm;
    dateYear.textContent = now.toLocaleDateString('en-US', options);

}

setInterval(showTime, 1000);
showTime();
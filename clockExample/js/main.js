'use strict';
(function() {
    const todayDateElement = document.querySelector(".today-date"),
        clockTimeElement = document.querySelector(".clock-time"),
        nextYearElement = document.querySelector(".next-year");
    const options = {
        date: {
            weekday: 'long',
            day: '2-digit',
            month: 'long'
        },
        time: {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        }
    };

    function timerCount() {
        let date = 0;
        return () => date = new Date();
    }

    function getDayDateMonth(el) {
        return `Сегодня ${el.toLocaleString('ru', options.date)}.`;
    }

    function getClockTime(el) {
        return `${el.toLocaleTimeString([], options.time)}`;
    }

    function curentDayNunber(date) {
        let currentDateTime = new Date();
        let startTimeOfCurrentYear = (new Date(date.getFullYear(), 0, 1)).getTime();
        let currentTime = currentDateTime.getTime();
        let pastTimeOfStartCurrentYear = currentTime - startTimeOfCurrentYear;
        return Math.ceil(pastTimeOfStartCurrentYear / 86400000);
    }

    function isLeapYear(year) {
        let isTrue = 0;
        year = parseFloat(year);
        ((year % 4 === 0) && (!(year % 100 === 0))) ? isTrue = 366: (year % 400 === 0) ? isTrue = 366 : isTrue = 365;
        return isTrue;
    }

    function init() {
        let nowDate = timerCount(),
            curentYear = nowDate().getFullYear(),
            curentDay = curentDayNunber(nowDate()),
            daysInCurentYear = isLeapYear(curentYear),
            numberDaysBeforeEndYear = daysInCurentYear - curentDay;
        todayDateElement.innerHTML = getDayDateMonth(nowDate());
        clockTimeElement.innerHTML = getClockTime(nowDate());
        nextYearElement.innerHTML = `До ${curentYear+1} года осталось ${numberDaysBeforeEndYear} дней.`;
    }
    setInterval(init, 1000);
}());
const monthDates = {
    "January": 31,
    "February": [28,29],
    "March": 31,
    "April": 30,
    "May": 31,
    "June": 30,
    "July": 31,
    "August": 31,
    "September": 30,
    "October": 31,
    "November": 30,
    "December": 31
}

const numToMonth = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December",
}

let calendar = document.getElementById("calendar")
let monthHeader = document.getElementById("header-month");
let yearHeader = document.getElementById("header-year");

/* Load Calendar */

let today = new Date();
let selectedMonth = Number(String(today.getMonth() + 1).padStart(2, '0'));
let selectedYear = today.getFullYear();

let dayPlanner = document.querySelector('#day-planner');
let dayPlannerDate = document.querySelector('#day-planner-date');

/* Handle Clicks*/

document.body.addEventListener("mousedown", function (evt) {
    /*if (evt.target.id != 'day-planner') {
    if (dayPlanner.style.display == 'flex') {
        dayPlanner.style.display = 'none';
    }*/
   if (evt.target.className == 'container' && evt.target.id == '') {
        dayPlanner.style.display = 'none';
   }
   if (evt.target.className == '' && evt.target.id == '') {
    dayPlanner.style.display = 'none';
    }
});

function numToDayTh(num) {
    if (num == 1 || num == 21 || num == 31) {
        return num + 'st';
    } else if (num == 2 || num == 22) {
        return num + 'nd';
    } else if (num == 3 || num == 23) {
        return num + 'rd';
    } else {
        return num + 'th';
    }
}

function loadDayPlanner(month,year,day) {
    let htmlStringToInsert = `
        <p id='day-planner-date'>`+ numToDayTh(day) + ' ' + numToMonth[month]; +`</p>
    `  

    dayPlannerDate.innerHTML = htmlStringToInsert
}

function loadCalendarForMonth() {
    if (selectedMonth == 0) {
        selectedYear -= 1;
        selectedMonth = 12;
    } else if (selectedMonth == 13) {
        selectedYear += 1;
        selectedMonth = 1;
    }

    calendar.innerHTML = '';

    monthHeader.innerHTML = numToMonth[selectedMonth];
    yearHeader.innerHTML = String(selectedYear);

    if (selectedMonth == 2) {
        if (selectedYear % 4) {
            for (let i = 1; i < 29; i++) {
                calendar.insertAdjacentHTML("beforeEnd", '<div class="calendar-square"><p class="calendar-square-num">' + i + '</p></div>');
            } 
        } else {
            for (let i = 1; i < 30; i++) {
                calendar.insertAdjacentHTML("beforeEnd", '<div class="calendar-square"><p class="calendar-square-num">' + i + '</p></div>');
            }
        }
    } else {
        for (let i = 1; i < monthDates[numToMonth[selectedMonth]] + 1; i++) {
            calendar.insertAdjacentHTML("beforeEnd", '<div class="calendar-square"><p class="calendar-square-num">' + i + '</p></div>');
        }
    }

    let calSquare = document.getElementsByClassName("calendar-square-num");
    
    for (let i = 0; i < calSquare.length; i++) {
        calSquare[i].addEventListener('mousedown', function (e) { 
            // set mouse state to true 
            loadDayPlanner(selectedMonth,selectedYear,calSquare[i].innerHTML);
            dayPlanner.style.display = 'flex';
            dayPlanner.style.left = e.clientX + 'px'; 
            dayPlanner.style.top = e.clientY + 'px'; 
            //e.preventDefault();
        }, true); 
    }
}

loadCalendarForMonth();

let nextMonth = document.querySelector("#next-month");
let previousMonth = document.querySelector("#previous-month");

nextMonth.addEventListener('click', () => {
    selectedMonth = selectedMonth + 1;
    loadCalendarForMonth();
});

previousMonth.addEventListener('click', () => {
    selectedMonth = selectedMonth - 1;
    loadCalendarForMonth();
})
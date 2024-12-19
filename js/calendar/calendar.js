


class Calendar {
    constructor() {
        
    }
    year_number_to_full_year(year) {
        let returningYear = {
            "January": 31,
            "February": 28,
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
        if (selectedYear % 4 == 0) {
            // Leap Year
            returningYear.February = 29;
            return returningYear
        } else {
            return returningYear
        }
    }
    num_to_dayth(num) {
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
    num_to_month(num) {
        const numToMonth = ["January","February","March","April","May","June","July","August","September","October","November","December"];

        let keys = numToMonth.keys()
        if (keys.includes(num-1)) {return numToMonth[num-1]}
    }
    change_date(day,month,year) {
        
    }
    update_calendar() {

    }
}

let calendar = document.getElementById("calendar")
let monthHeader = document.getElementById("header-month");
let yearHeader = document.getElementById("header-year");

/* Load Calendar */



let dayPlanner = document.querySelector('#day-planner');
let dayPlannerDate = document.querySelector('#day-planner-date');
let inputEventBox = document.querySelector("#day-planner-event-add-input");
let calSquareNum = document.getElementsByClassName("calendar-square-num");

/* Handle Clicks*/

document.body.addEventListener("mousedown", function (evt) {
   if (evt.target.className == 'container' && evt.target.id == '') {
        dayPlanner.style.display = 'none';
   }
   if (evt.target.className == '' && evt.target.id == '') {
    dayPlanner.style.display = 'none';
    }
});

function loadDayPlanner(month,year,day) {
    dayPlannerDate.innerHTML = numToDayTh(day) + ' ' + numToMonth[month];
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

    
    let addEventButtons = document.getElementsByClassName("day-planner-event-add");

    for (let x = 0; x < addEventButtons.length; x++) {
        addEventButtons[x].addEventListener('mousedown', function (e) {
            appendEvent(selectedDate, inputEventBox.value);
            updateSearches({target:{value: ''}})
            
        }, true); 
    }
    highlightCurrentDay();
    for (let i = 0; i < calendarSquares.length; i++) {
        calendarSquares[i].addEventListener("mousedown", function(evt) {
            calendarSquareHandler(i, evt);
        });
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
});


/* Highlight Current Day */

function highlightCurrentDay() {
    if ( (selectedMonth == Number(String(today.getMonth() + 1).padStart(2, '0')) ) && (selectedYear == today.getFullYear())) {
        for (let i=0; i < calSquareNum.length; i++) {
            if (calSquareNum[i].innerHTML == today.getDate()) {
                calSquareNum[i].style.color = '#FFFFFF';
                calSquareNum[i].parentElement.style.backgroundColor = '#e03800';
            }
        }   
    }
}

highlightCurrentDay();
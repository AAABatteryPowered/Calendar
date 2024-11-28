let today = new Date();

let selectedMonth = Number(String(today.getMonth() + 1).padStart(2, '0'));
let selectedYear = today.getFullYear();
let selectedDate = numToMonth[today.getDate()] + '/' + selectedMonth + '/' + selectedYear;
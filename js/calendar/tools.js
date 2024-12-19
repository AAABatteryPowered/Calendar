let selectedPoints = [];
let currentSelection = [];

let currentTool = 'null';

let calendarSquares = document.getElementsByClassName('calendar-square');
let calendarSquaresNum = document.getElementsByClassName('calendar-square-num');
let prefoundNumberSquares = {};

let addEvent = document.getElementById("add-event");
let selectionTool = document.getElementById("tool-selection");

selectionTool.addEventListener("mousedown", function(evt) {
    if (currentTool == 'selection') {
        currentTool = 'none';
        clearCurrentSelection(0,true,[]);
        selectionTool.style.backgroundColor = 'white';
        selectionTool.style.color = '#e03800';
    } else {
        currentTool = 'selection';
        
        selectionTool.style.backgroundColor = '#e03800';
        selectionTool.style.color = 'white';
    }
});

function findNumberSquare(num) {
    for (let i = 0; i < calendarSquaresNum.length; i++) {
        if (calendarSquaresNum[i].innerHTML == num) {
            return [calendarSquaresNum[i].parentElement, calendarSquaresNum[i]];
        }
    }
}

function clearCurrentSelection(i, deselecting, exclude) {
    if (deselecting) {
        if ( selectedPoints.length > 0  ) {
            for (let i = currentSelection[0]; i < Number([currentSelection[currentSelection.length-1]])+1; i++) {
                if (!(exclude.includes(i))) {
                    let [square, num] = findNumberSquare(i);
                    square.style.backgroundColor = 'white';
                    num.style.color = 'rgb(202, 35, 35)';
                } else {
                    let [square, num] = findNumberSquare(i);
                    square.style.backgroundColor = '#4a59ff';
                    num.style.color = 'white';
                }
            }
            if (selectedPoints.length > 0) {
                for (let i = 0; i < selectedPoints.length; i++) {
                    let [square, num] = findNumberSquare(selectedPoints[i]);
                    square.style.backgroundColor = 'white';
                    num.style.color = 'rgb(202, 35, 35)';
                }
                
            }
            selectedPoints = [];
            currentSelection = [];
        }
    } else {
        if ( (selectedPoints.length > 0 ) && (currentSelection.length > 0) ) {
            for (let i = currentSelection[0]; i < Number([currentSelection[currentSelection.length-1]])+1; i++) {
                if (!(exclude.includes(i))) {
                    prefoundNumberSquares[i][0].style.backgroundColor = 'white';
                    prefoundNumberSquares[i][1].style.color = 'rgb(202, 35, 35)';
                } else {
                    let [square, num] = findNumberSquare(i);
                    square.style.backgroundColor = '#4a59ff';
                    num.style.color = 'white';
                }
            }
            selectedPoints = [i+1];
            currentSelection = [];
        }
    }
}

function calendarSquareHandler(i,evt) {
    if (currentTool == 'selection') {
        selectedPoints.push(i+1);
        let [square, num] = findNumberSquare(i+1);
        prefoundNumberSquares[i+1] = [square,num];
        square.style.backgroundColor = '#4a59ff';
        num.style.color = 'white';
        if (selectedPoints.length > 1 && selectedPoints.length < 3) {
            let startPoint = selectedPoints[0];
            let endPoint = selectedPoints[1];

            if (startPoint > endPoint) {
                startPoint = selectedPoints[1];
                endPoint = selectedPoints[0];
            }
            for (let i = startPoint; i < endPoint + 1; i++) {
                currentSelection.push(i);
                let [square, num] = findNumberSquare(i);
                prefoundNumberSquares[i] = [square,num];
                square.style.backgroundColor = '#4a59ff';
                num.style.color = 'white';
            }

            /*appendEvent({
                name: "yes", 
                dates: [1,2,3,4,5],
                startEnd: [1500,2000]
            })*/

        } else {
            if (selectedPoints.length > 2) {
                let [square, num] = findNumberSquare(i+1);
                prefoundNumberSquares[i+1] = [square,num];
                square.style.backgroundColor = '#4a59ff';
                num.style.color = 'white';
            }
            clearCurrentSelection(i, false, [i+1]);
            
        }
    }
}

for (let i = 0; i < calendarSquares.length; i++) {
    calendarSquares[i].addEventListener("mousedown", function(evt) {
        calendarSquareHandler(i, evt);
    });
}

addEvent.addEventListener("mousedown", function(evt) {
    console.log(currentSelection, selectedPoints);
    appendEvent('test', currentSelection, selectedMonth,selectedYear);
    console.log(allEvents);
});


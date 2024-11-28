let allEvents = {
};

let searchEventsInputBox = document.querySelector('#search-event');
let eventsList = document.querySelector('#events-list');

function appendEvent(date, event) {
    if (allEvents[date]) {
        allEvents[date].push(event);
    } else {
        allEvents[date] = [event];
    }
}

function searchEventsFor(string) {
    let Event_key;
    
    let allValues = Object.values(allEvents);

    for (let i=0; i < allValues.length; i++) {
        if (allValues[i] == string) {
            Event_key = Object.keys(allEvents)[i];
            console.log(Event_key);
        }  
    }

    return [Event_key, string]
}

searchEventsInputBox.addEventListener('input', (e) => {
    if (e == '') {

    } else {
        let [date, eventString] = searchEventsFor(e.target.value);
        if ( !(typeof date == 'undefined') && !(typeof eventString == 'undefined') ) {
            eventsList.insertAdjacentHTML("beforeEnd", '<div class="event"><p class="event-name">' + eventString + '</p></div>');
        }
    };
});
let allEvents = {
    
};

let searchEventsInputBox = document.querySelector('#search-event');
let eventsList = document.querySelector('#events-list');

function appendEvent(name, timespan) {
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
    updateSearches(e);
});

function updateSearches(e) {
    if (e.target.value == '') {
        console.log("yuh");

        let allValues = Object.values(allEvents);
        
        console.log(allEvents.length);
        for (let i=0; i < allValues.length; i++) {
            console.log(allValues[i]);
            eventsList.insertAdjacentHTML("beforeEnd", '<div class="event"><p class="event-date">' + Object.keys(allEvents)[i] + '</p><p class="event-name">' + allValues[i]+ '</p></div>');
        }
        console.log(allEvents.length);
    } else {
        let [date, eventString] = searchEventsFor(e.target.value);
        if ( !(typeof date == 'undefined') && !(typeof eventString == 'undefined') ) {
            eventsList.insertAdjacentHTML("beforeEnd", '<div class="event"><p class="event-name">' + eventString + '</p></div>');
        }
    };
}
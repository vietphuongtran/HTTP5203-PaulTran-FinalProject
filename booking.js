    //I have to erase API KEY here for security reason
var CLIENT_ID = '<YOUR_API_ID>';
var API_KEY = '<YOUR_API_KEY>';

var SCOPES = ["https://www.googleapis.com/auth/calendar"];

/**
* Check if current user has authorized this application.
*/
function checkAuth() {
gapi.auth.authorize(
  {
    'client_id': CLIENT_ID,
    'scope': SCOPES.join(' '),
    'immediate': true
  }, handleAuthResult);
}

/**
* Handle response from authorization server.
*
* @param {Object} authResult Authorization result.
*/
function handleAuthResult(authResult) {
var authorizeDiv = document.getElementById('authorize-div');
if (authResult && !authResult.error) {
  // Hide auth UI, then load client library.
  authorizeDiv.style.display = 'none';
  loadCalendarApi();
} else {
  // Show auth UI, allowing the user to initiate authorization by
  // clicking authorize button.
  authorizeDiv.style.display = 'inline';
}
}

/**
* Initiate auth flow in response to user clicking authorize button.
*
* @param {Event} event Button click event.
*/
function handleAuthClick(event) {
gapi.auth.authorize(
  {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
  handleAuthResult);
return false;
}

/**
* Load Google Calendar client library. List upcoming events
* once client library is loaded.
*/
function loadCalendarApi() {
gapi.client.load('calendar', 'v3', insertEvent);
}

/**
* Append a pre element to the body containing the given message
* as its text node.
*
* @param {string} message Text to be placed in pre element.
*/
//Problems: append pre is not working!!
function appendPre(message) {
var pre = document.getElementById('output');
var textContent = document.createTextNode(message + '\n');
pre.appendChild(textContent);
}
 
function insertEvent() { 
    //when create the event grabbed the form and the value inside it
    var formHandle = document.forms[0];
    //call on function processForm
    formHandle.onsubmit = processForm;
    function processForm() {
        //validate the form        
        //validate bookingDate
        var bookingDate = document.getElementById("bookingDate");
        var bookingDateErr = document.getElementById("bookingDateErr");
        //validate Email
        var bookingEmail = document.getElementById("bookingEmail");
        var bookingEmailErr = document.getElementById("bookingEmailErr");
        var regexEmail = /^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/
        //validate bookingQuantity
        var bookingQuantity = document.getElementById("bookingQuantity");
        var bookingQuantityErr = document.getElementById("bookingQuantityErr");
//        //confirm
//        var confirmMsg = document.getElementById("confirm");
        //Problem: Can't get a confirmMsg here cuz it requires to return false to the form but to insert to calendar, it requires return true
        //Solution: have a warning at the end so that people will know to fill out every field and check their calendar.
        
        //validate booking date
        if (bookingDate.value === "" || bookingDate.value === null) {
            bookingDate.focus();
            bookingDateErr.innerHTML = "Please enter a date";
            return false;
        }
        //validate Email
        if (bookingEmail.value === "" || bookingEmail.value === null || !regexEmail.test(bookingEmail.value)) {
            bookingEmail.focus();
            bookingEmailErr.innerHTML = "Please enter an email";
            return false;
        }
        //validate bookingQuantity
        if (bookingQuantity.value === "none" || bookingQuantity.value === null) {
            bookingQuantity.focus();
            bookingQuantityErr.innerHTML = "Please enter who you are going with";
            return false;
        }
        var event = {
          'summary': 'Pompeii Dinner Reservation',
          'location': '205 Humber College Blvd, Etobicoke, ON M9W 5L7',
          'description': 'Enjoy your dinner at the best restaurant in the world',
          'start': {
            'dateTime': formHandle.bookingDate.value + 'T19:00:00-04:00',
            'timeZone': 'America/New_York'
          },
          'end': {
            'dateTime': formHandle.bookingDate.value +'T21:00:00-04:00',
            'timeZone': 'America/New_York'
          },
          'recurrence': [
              //it is not a recurring event, we don't need this one
//            'RRULE:FREQ=DAILY;COUNT=2'
          ],
          'attendees': [
            {'email': formHandle.bookingEmail.value}
          ],
          'reminders': {
            'useDefault': false,
            'overrides': [
              {'method': 'email', 'minutes': 24 * 60},
              {'method': 'popup', 'minutes': 10}
            ]
          }
        };
        var request = gapi.client.calendar.events.insert({
          'calendarId': formHandle.bookingEmail.value,
          'resource': event
        });

        request.execute(function(event) {
            //Problem 1: event.htmlLink is undefined
            //Solution: switch it with event.summary
            //Problem 2: append pre is not working
            appendPre('Event created: ' + event.summary);
            console.log("Event added to Calendar");
            console.log(pre);
        });
    }
}
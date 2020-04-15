    // Your Client ID can be retrieved from your project in the Google
      // Developer Console, https://console.developers.google.com
      var CLIENT_ID = '1014621907623-psaaohgll979f9m44c7nik0tn9e29d2i.apps.googleusercontent.com';
        var API_KEY = 'AIzaSyBcjJih5MQcecjdtUKPHxO8IJX1ODoqLSM';
 
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
    //gapi.load('auth2', function() {
        //var visitorEmail = formHandle.bookingEmail;
        //var bookingDate = formHandle.bookingDate;
        var event = {
          'summary': 'Google I/O 2017',
          'location': '800 Howard St., San Francisco, CA 94103',
          'description': 'A chance to hear more about Google\'s developer products.',
          'start': {
            'dateTime': formHandle.bookingDate.value + 'T09:00:00-07:00',
            'timeZone': 'America/Los_Angeles'
          },
          'end': {
            'dateTime': formHandle.bookingDate.value +'T17:00:00-07:00',
            'timeZone': 'America/Los_Angeles'
          },
          'recurrence': [
            'RRULE:FREQ=DAILY;COUNT=2'
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
            appendPre('Event created: ' + event.summary);
            console.log("Event added to Calendar");
            console.log(pre);
        });
    }
}
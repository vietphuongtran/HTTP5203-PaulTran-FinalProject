
var CLIENT_ID = '1014621907623-psaaohgll979f9m44c7nik0tn9e29d2i.apps.googleusercontent.com';
var API_KEY = 'AIzaSyBcjJih5MQcecjdtUKPHxO8IJX1ODoqLSM';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

  // Authorization scopes required by the API; multiple scopes can be
  // included, separated by spaces.
  var SCOPES = "https://www.googleapis.com/auth/calendar";

  var authorizeButton = document.getElementById('authorize_button');
  var signoutButton = document.getElementById('signout_button');

  /**
   *  On load, called to load the auth2 library and API client library.
   */
      function handleClientLoad() {
        gapi.load('client:auth2', initClient);
      }

      /**
       *  Initializes the API client library and sets up sign-in state
       *  listeners.
       */
      function initClient() {
        gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES
        }).then(function () {
          // Listen for sign-in state changes.
          gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

          // Handle the initial sign-in state.
          updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
          authorizeButton.onclick = handleAuthClick;
          signoutButton.onclick = handleSignoutClick;
        }, function(error) {
          appendPre(JSON.stringify(error, null, 2));
        });
      }

      /**
       *  Called when the signed in status changes, to update the UI
       *  appropriately. After a sign-in, the API is called.
       */
      function updateSigninStatus(isSignedIn) {
        if (isSignedIn) {
          authorizeButton.style.display = 'none';
          signoutButton.style.display = 'block';
          createEvent();
        } else {
          authorizeButton.style.display = 'block';
          signoutButton.style.display = 'none';
        }
      }

      /**
       *  Sign in the user upon button click.
       */
      function handleAuthClick(event) {
        gapi.auth2.getAuthInstance().signIn();
      }

      /**
       *  Sign out the user upon button click.
       */
      function handleSignoutClick(event) {
        gapi.auth2.getAuthInstance().signOut();
      }

      /**
       * Append a pre element to the body containing the given message
       * as its text node. Used to display the results of the API call.
       *
       * @param {string} message Text to be placed in pre element.
       */
      function appendPre(message) {
        var pre = document.getElementById('content');
        var textContent = document.createTextNode(message + '\n');
        pre.appendChild(textContent);
      }
    function createEvent() {
        //when create the event grabbed the form and the value inside it
        var formHandle = document.forms[0];
        //call on function processForm
        formHandle.onsubmit = processForm;
        function processForm() {
            //gapi.load('auth2', function() {
                var visitorEmail = formHandle.visitor_email;
                var bookingDate = formHandle.bookingdate;
                var event = {
                    'summary': 'Pompeii Dinner Reservation',
                    'location': '4213 Tea Garden Circle, Mississauga, L5B 2Z1',
                    'description': 'Enjoy your evening at the best restaurant in the world',
                    'start': {
                    'dateTime': bookingDate.value + 'T19:00:00-04:00',
                    'timeZone': 'Canada/Toronto'
                },
                  'end': {
                    'dateTime': bookingDate.value + 'T21:00:00-04:00',
                    'timeZone': 'Canada/Toronto'
              },
                  'recurrence': [
                    'RRULE:FREQ=DAILY;COUNT=2'
                  ],
                  'attendees': [
                    {'email': visitorEmail.value},
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
                  'calendarId': visitorEmail.value,
                  'resource': event
                });

                request.execute(function(event) {
                    //appendPre('Event created: %s' + event.htmlLink);
                });      
        //});//end gapi load 
    }//end processForm function
}//end createEvent function
 
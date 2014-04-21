define([
    'q',
    'gapi'
], function(
    Q,
    gapi
) {
    var exports = {};

    var clientId = '535245779168-o379drscdduhkf0uto8qjac7hq83r7os.apps.googleusercontent.com';
    var scopes = 'https://www.googleapis.com/auth/calendar';

    // Public

    // Private

    function makeApiCall() {
        return;
      gapi.client.load('calendar', 'v3', function() {
        var request = gapi.client.calendar.events.list({
          'calendarId': 'primary'
        });

        request.execute(function(resp) {
          for (var i = 0; i < resp.items.length; i++) {
            var li = document.createElement('li');
            li.appendChild(document.createTextNode(resp.items[i].summary));
            document.getElementById('events').appendChild(li);
          }
        });
      });
    }

    function addNew() {
        var resource = {
          "summary": "Appointment",
          "location": "Somewhere",
          "start": {
            "dateTime": "2014-04-16T10:00:00.000-07:00"
          },
          "end": {
            "dateTime": "2014-04-16T10:25:00.000-07:00"
          }
        };

        gapi.client.load('calendar', 'v3', function() {
            var request = gapi.client.calendar.events.insert({
              'calendarId': 'primary',
              'resource': resource
            });
            request.execute(function(resp) {
              console.log(resp);
            });
        });
    }

    return exports;
});

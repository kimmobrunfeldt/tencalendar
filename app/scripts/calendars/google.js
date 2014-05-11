define([
    'underscore',
    'q',
    'gapi',
    'application',
    'utils'
], function(
    _,
    Q,
    gapi,
    application,
    utils
) {
    var exports = {};

    var createEvent = exports.createEvent = function(event, calendarId) {
        calendarId = utils.defaultParameter(calendarId, 'primary');

        var def = Q.defer();

        var resource = {
            summary: event.summary,
            location: event.location,
            start: {
                // Format: 2014-05-11T13:31:29+03:00
                dateTime: event.start.format()
            },
            end: {
                dateTime: event.end.format()
            }
        };

        gapi.client.load('calendar', 'v3', function() {
            var request = gapi.client.calendar.events.insert({
                calendarId: calendarId,
                resource: resource
            });

            _request(request, def);
        });

        return def.promise;
    };

    var events = exports.events = function(calendarId) {
        calendarId = utils.defaultParameter(calendarId, 'primary');

        var def = Q.defer();

        gapi.client.load('calendar', 'v3', function() {
            var request = gapi.client.calendar.events.list({
                calendarId: calendarId
            });

            _request(request, def);
        });

        return def.promise;
    };

    var _request = function(request, def) {
        return request.execute(function(response) {
            if (_.has(response, 'error')) {
                console.log(response);

                if (response.error.code === 401) {
                    application.navigate('#logout');
                }

                def.reject(response);
            } else {
                def.resolve(response);
            }
        });
    };

    return exports;
});

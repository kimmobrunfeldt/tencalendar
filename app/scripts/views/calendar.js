define([
    'underscore',
    'jquery',
    'marionette',
    'anytime',
    'application',
    'vent',
    'auth',
    'calendar',
    'event',
    'utils',
    'templateHelpers',
    'text!templates/calendar.html'
], function (
    _,
    $,
    Marionette,
    anytime,
    application,
    vent,
    auth,
    calendar,
    Event,
    utils,
    templateHelpers,
    calendarTemplate
) {
    return Marionette.ItemView.extend({

        template: _.template(calendarTemplate),
        templateHelpers: templateHelpers,

        events: {
            'click #create-event': '_createEvent',
            'keypress #event-input': '_onEventInputKeyPress'
        },

        initialize: function() {
            _.bindAll(this, '_createEvent', '_onEventInputKeyPress');
        },

        _onEventInputKeyPress: function(event) {
            if (!event) {
                event = window.event;
            }

            // When enter is pressed, create event
            var keyCode = event.keyCode || event.which;
            if (keyCode == '13'){
                event.preventDefault();
                this._createEvent();
                return false;
            }
        },

        _createEvent: function() {
            var $eventInput = $('#event-input');
            var text = $eventInput.val();
            var event;

            try {
                event = this._parseEvent(text);
            } catch(error) {
                if (_.isString(error)) {
                    utils.alert(error);
                } else {
                    throw error;
                }

                return;
            }

            calendar.createEvent(event).then(function success(response) {
                $eventInput.val('');
            }, function fail(response) {

            });
        },

        _parseEvent: function(text) {
            var textComponents = text.split(',', 2);

            if (textComponents.length !== 2) {
                throw 'No date specified!';
            }

            var summary = textComponents[0];
            var textAfterSummary = textComponents[1];
            var location;

            if (textAfterSummary.indexOf('@') !== -1) {
                location = _.last(textAfterSummary.split('@'));
            }

            var time;
            var timeText = location ? textAfterSummary.split('@')[0] : textAfterSummary;

            time = anytime.parse(timeText);
            if (!time) {
                throw 'Couldn\'t understand "' +  timeText + '"';
            }

            var end = time.clone();
            end.add('minutes', 15);

            var event = new Event({
                summary: summary,
                location: location,
                start: time,
                end: end
            });

            return event;
        }

    });
});

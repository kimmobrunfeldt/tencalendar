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
            'keypress #event-input': '_onEventInputKeyPress',
            'input #event-input': '_onEditInput',
            'propertychange #event-input': '_onEditInput'
        },

        initialize: function() {
            _.bindAll(this,
                '_createEvent',
                '_onEventInputKeyPress',
                '_onEditInput'
            );
        },

        onRender: function() {
            setTimeout(function() {
                $('#event-input').focus();
            }, 0);
        },

        _onEventInputKeyPress: function(event) {
            if (utils.isEventEnterPress(event)) {
                this._createEvent();
                return false;
            }
        },

        _onEditInput: function(event) {
            $(event.currentTarget).removeClass('error');

            if ($('#error').html() !== '') {
                this._hideErrorAfterDelay();
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
                    $eventInput.addClass('error');
                    this._displayError(error);
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

            var summary = textComponents[0].trim();
            var textAfterSummary = textComponents[1].trim();
            var location;

            if (textAfterSummary.indexOf('@') !== -1) {
                location = _.last(textAfterSummary.split('@'));
            }

            var time;
            var timeText = location ? textAfterSummary.split('@')[0] : textAfterSummary;
            timeText = timeText.trim();

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
        },

        _errorTimer: undefined,
        _clearErrorTimer: function() {
            if (this._errorTimer) {
                clearTimeout(this._errorTimer);
                console.log('clear timer!')
            }
        },

        _displayError: function(text) {
            // Events from input edit / enter press might occur in different
            // order they actually were launched, so we must double check
            // that the timer is not set if we show error
            this._clearErrorTimer();
            // TODO: not working
            $('#error').stop().fadeIn(0).show().html(text);
        },

        _hideErrorAfterDelay: function() {
            this._clearErrorTimer();
            this._errorTimer = setTimeout(function() {
                var $error = $('#error');
                $error.fadeOut(function() {
                    $error.html('');
                    $error.show();
                });
            }, 0);
        }
    });
});

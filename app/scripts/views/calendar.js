define([
    'underscore',
    'marionette',
    'application',
    'vent',
    'auth',
    'templateHelpers',
    'text!templates/calendar.html'
], function (
    _,
    Marionette,
    application,
    vent,
    auth,
    templateHelpers,
    calendarTemplate
) {
    return Marionette.ItemView.extend({

        template: _.template(calendarTemplate),
        templateHelpers: templateHelpers,

        events: {
            'click .login': '_login',
        },

        _login: function(e) {
            e.preventDefault();
            auth.login();
        },
    });
});

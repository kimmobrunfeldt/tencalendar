define([
    'underscore',
    'marionette',
    'application',
    'vent',
    'auth',
    'templateHelpers',
    'text!templates/landing.html'
], function (
    _,
    Marionette,
    application,
    vent,
    auth,
    templateHelpers,
    landingTemplate
) {
    return Marionette.ItemView.extend({

        template: _.template(landingTemplate),
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

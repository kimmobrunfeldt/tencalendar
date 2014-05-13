define([
    'backbone',
    'underscore',
    'marionette',
    'application',
    'vent',
    'auth',
    'templatehelpers',
    'text!templates/landing.html'
], function (
    Backbone,
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
            auth.authorize().then(function success() {
                if (Backbone.history.fragment === 'calendar') {
                    Backbone.history.loadUrl(Backbone.history.fragment);
                } else {
                    application.navigate('calendar');
                }
            }, function fail() {
                console.log('login failed');
            });
        },
    });
});

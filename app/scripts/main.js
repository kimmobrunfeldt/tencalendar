require.config({
    paths: {
        jquery: 'libs/jquery',
        q: 'libs/q',
        underscore: 'libs/underscore',
        gapi: 'libs/google-api',

        // RequireJS plugins
        i18n: 'libs/require/i18n',
        text: 'libs/require/text',
        async: 'libs/require/async',

        // Backbone and Marionette
        backbone: 'libs/backbone',
        marionette: 'libs/backbone.marionette.amd',
        'backbone.wreqr' : 'libs/backbone.wreqr',
        'backbone.babysitter' : 'libs/backbone.babysitter',

        // Other
        templates: '../templates'
    }
});

require([
    'underscore',
    'backbone',
    'application',
    'router'
], function (
    _,
    Backbone,
    application,
    Router
) {
    application.addInitializer(function(options) {
        application.router = new Router();

        application.navigate = function (route, options) {
            options = options || {};
            application.router.navigate(route, _.extend({trigger: true}, options));
        };

        Backbone.history.start();
    });

    console.log('Start application')
    application.start();
});

require.config({
    paths: {
        jquery: 'libs/jquery',
        q: 'libs/q',
        underscore: 'libs/underscore',
        gapi: 'libs/google-api',  // JS google API library
        moment: 'libs/moment',
        anytime: 'libs/anytime',
        foundation: 'libs/foundation.min',

        // RequireJS plugins
        text: 'libs/require/text',
        async: 'libs/require/async',

        // Backbone and Marionette
        backbone: 'libs/backbone',
        marionette: 'libs/backbone.marionette.amd',
        'backbone.wreqr' : 'libs/backbone.wreqr',
        'backbone.babysitter' : 'libs/backbone.babysitter',

        // Other
        templates: '../templates'
    },
    shim: {
        foundation: ['jquery']
    }
});

require([
    'jquery',
    'foundation',
    'underscore',
    'backbone',
    'application',
    'router',
], function (
    $,
    foundation,
    _,
    Backbone,
    application,
    Router
) {
    // Initialize foundation
    $(document).foundation();

    application.addInitializer(function(options) {
        application.router = new Router();

        application.navigate = function(route, options) {
            options = options || {};
            application.router.navigate(route, _.extend({trigger: true}, options));
        };

        Backbone.history.start();
    });

    application.start();
});
